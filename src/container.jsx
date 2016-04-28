'use strict';

import { clipboard as Clipboard } from 'electron';

class Container {
  static get KEY_CODES() {
    return {
      'Enter': 13,
      'Esc': 27,
      'd': 68,
      'f': 70,
      'h': 72,
      'i': 73,
      'j': 74,
      'k': 75,
      'l': 76,
      'y': 89
    };
  }

  constructor() {
    this.resultArea = document.getElementById('resut_area');
    this.currentImageArea = null;

    // TODO: Refactor to stop using raw keycodes
    document.addEventListener('keydown', (e) => {
      if (e.keyCode == Container.KEY_CODES['j']) {
        if (this._checkActive(this.searchTextBox)) {
          this._moveToNextImage();
        }
      } else if (e.keyCode == Container.KEY_CODES['k']) {
        if (this._checkActive(this.searchTextBox)) {
          this._moveToPreviousImage();
        }
      } else if (e.keyCode == Container.KEY_CODES["y"]) {
        if (this.currentImageArea && this._checkActive(this.searchTextBox)) {
          const textForCopy = '![LGTM](' + this.currentImageArea.firstChild.src + ')';
          Clipboard.writeText(textForCopy);
          document.title = 'Copied | ' + textForCopy;

          setTimeout(() => {
            document.title = this._title();
          }, 3000);
        }
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

  _renderSingleImageArea(id, src) {
    const imageArea = document.createElement('div');
    imageArea.id = id;
    imageArea.classList.add('image_area');

    const image = document.createElement('img');
    image.src = src;

    imageArea.appendChild(image);
    this.resultArea.appendChild(imageArea);
  }
}
