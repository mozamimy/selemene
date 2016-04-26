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
      const id = localStorage.key(i);
      const src = localStorage.getItem(localStorage.key(i));

      this._renderSingleImageArea(id, src);
    }
  }
}
