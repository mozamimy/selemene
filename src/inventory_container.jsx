'use strict';

class InventoryContainer extends Container {
  constructor() {
    super();

    this.resultArea = document.getElementById('result_area');

    this._renderImagesArea();

    document.addEventListener('keydown', (e) => {
      if (e.keyCode == Container.KEY_CODES['h']) {
        document.location.href = 'index.html';
      } else if (e.keyCode == Container.KEY_CODES['d'] && this.currentImageArea != null) {
        this._removeFromInventory(this.currentImageArea.id);
      }
    });
  }

  _renderImagesArea() {
    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i);
      const src = localStorage.getItem(localStorage.key(i));

      this._renderSingleImageArea(id, src);
    }
  }

  _removeFromInventory(giphy_id) {
    this.currentImageArea.classList.remove('current');

    if (this.currentImageArea.previousSibling) {
      var afterImageArea = this.currentImageArea.previousSibling;
    } else if (this.currentImageArea.nextSibling) {
      var afterImageArea = this.currentImageArea.nextSibling;
    } else {
      var afterImageArea = null;
    }

    this.currentImageArea.parentNode.removeChild(this.currentImageArea);
    this.currentImageArea = afterImageArea;

    if (this.currentImageArea) {
      this.currentImageArea.classList.add('current');
      location.hash = this.currentImageArea.id;
    }

    localStorage.removeItem(giphy_id);

    document.title = `Removed from the inventory, ${giphy_id}`;

    setTimeout(() => {
      document.title = this._title();
    }, 3000);
  }

  _title() {
    return 'Selemene; Inventory';
  }
}
