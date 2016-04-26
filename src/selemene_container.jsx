'use strict';

class SelemeneContainer extends Container {
  constructor() {
    super();

    this.searchTextBox = document.getElementById('search_keyword');
    this.searchTextBox.focus();

    // TODO: Refactor to stop using raw keycodes
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == Container.KEY_CODES["Esc"]) {
        this.searchTextBox.blur();
      } else if (e.keyCode == Container.KEY_CODES['i'] && this._checkActive(this.searchTextBox)) {
        this.searchTextBox.focus();
        e.preventDefault();
      } else if (e.keyCode == Container.KEY_CODES['f']) {
        if (this._checkActive(this.searchTextBox)) {
          this._addToInventory(this.currentImageArea.id, this.currentImageArea.childNodes[0]);
        }
      } else if (e.keyCode == Container.KEY_CODES['l']) {
        if (this._checkActive(this.searchTextBox)) {
          document.location.href = 'inventory.html';
        }
      }
    });

    this.searchTextBox.addEventListener('keydown', (e) => {
      if (e.keyCode == Container.KEY_CODES['Enter']) {
        this.currentImageArea = null;

        let giphy = new Giphy;
        giphy.search(this.searchTextBox.value, this.resultArea).then((resources) => {
          this._renderResult(resources);
        });
      }
    });
  }

  _renderResult(resources) {
    this._clear(this.resultArea);

    resources.data.forEach((resource) => {
      this._renderSingleImageArea(resource['id'], resource['images']['original']['url']);
    });
  }

  _clear(resultArea) {
    while (resultArea.firstChild) {
      resultArea.removeChild(resultArea.firstChild);
    }
  }

  _addToInventory(giphy_id, node) {
    localStorage.setItem(giphy_id, node.src);

    document.title = `Added to the inventory, ${giphy_id}`;

    setTimeout(() => {
      document.title = this._title();
    }, 3000);
  }

  _title() {
    return 'Selemene; Search';
  }
}
