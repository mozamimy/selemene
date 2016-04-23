'use strict';

class InventoryContainer extends Container {
  constructor() {
    super();

    this.resultArea = document.getElementById('result_area');

    this._renderImagesArea();

    document.addEventListener('keydown', (e) => {
      if (e.keyCode == InventoryContainer.KEY_CODES["h"]) {
        document.location.href = 'index.html';
      }
    });
  }

  _renderImagesArea() {
    for (let i = 0; i < localStorage.length; i++) {
      let imageArea = document.createElement('div');
      imageArea.id = localStorage.key(i);
      imageArea.classList.add('image_area');

      let image = document.createElement('img');
      image.src = localStorage.getItem(localStorage.key(i));

      imageArea.appendChild(image);
      this.resultArea.appendChild(imageArea);
    }
  }
}
