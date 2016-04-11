'use strict';

import * as CopyPaste from 'copy-paste';

class SelemeneContainer {
  static get KEY_CODES() {
    return {
      "Esc": 27,
      "Enter": 13,
      "i": 73,
      "j": 74,
      "k": 75,
      "y": 89
    };
  }

  constructor() {
    this.searchTextBox = document.getElementById('search_keyword');
    this.resultArea = document.getElementById('resut_area');
    this.currentImageArea = null;

    this.searchTextBox.focus();

    document.addEventListener('keydown', (e) => {
      if (e.keyCode == SelemeneContainer.KEY_CODES["Esc"]) {
        this.searchTextBox.blur();
      } else if (e.keyCode == SelemeneContainer.KEY_CODES["i"]) {
        if (this._checkActive(this.searchTextBox)) {
          this.searchTextBox.focus();
          e.preventDefault();
        }
      } else if (e.keyCode == SelemeneContainer.KEY_CODES["j"]) {
        if (this._checkActive(this.searchTextBox)) {
          this._moveToNextImage();
        }
      } else if (e.keyCode == SelemeneContainer.KEY_CODES["k"]) {
        if (this._checkActive(this.searchTextBox)) {
          this._moveToPreviousImage();
        }
      } else if (e.keyCode == SelemeneContainer.KEY_CODES["y"]) {
        if (this.currentImageArea && this._checkActive(this.searchTextBox)) {
          let textForCopy = '![LGTM](' + this.currentImageArea.firstChild.src + ')';
          CopyPaste.copy(textForCopy);
          document.title = 'Copied | ' + textForCopy;

          setTimeout(() => {
            document.title = 'Selemene';
          }, 3000);
        }
      }
    });

    this.searchTextBox.addEventListener('keydown', (e) => {
      if (e.keyCode == SelemeneContainer.KEY_CODES['Enter']) {
        this.currentImageArea = null;

        let giphy = new Giphy;
        giphy.search(this.searchTextBox.value, this.resultArea).then((resources) => {
          this._renderResult(resources);
        });
      }
    });
  }

  _moveToNextImage() {
    if (this.currentImageArea == null) {
      this.currentImageArea = this.resultArea.firstChild
    } else {
      if (this.currentImageArea.nextSibling) {
        this.currentImageArea.classList.remove('current');
        this.currentImageArea = this.currentImageArea.nextSibling;
      }
    }

    this.currentImageArea.classList.add('current');
    location.hash = this.currentImageArea.id;
  }

  _moveToPreviousImage() {
    if (this.currentImageArea == null) {
      this.currentImageArea = this.resultArea.firstChild
    } else {
      if (this.currentImageArea.previousSibling) {
        this.currentImageArea.classList.remove('current');
        this.currentImageArea = this.currentImageArea.previousSibling;
      }
    }

    this.currentImageArea.classList.add('current');
    location.hash = this.currentImageArea.id;
  }

  _checkActive(domObject) {
    return (document.activeElement != domObject);
  }

  _renderResult(resources) {
    this._clear(this.resultArea);

    resources.data.forEach((resource) => {
      let imageArea = document.createElement('div');
      imageArea.id = resource['id'];
      imageArea.classList.add('image_area');

      let image = document.createElement('img');
      image.src = resource['images']['original']['url'];

      imageArea.appendChild(image);
      this.resultArea.appendChild(imageArea);
    });
  }

  _clear(resultArea) {
    while (resultArea.firstChild) {
      resultArea.removeChild(resultArea.firstChild);
    }
  }
}
