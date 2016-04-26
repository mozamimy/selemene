'use strict';

class Container {
  static get KEY_CODES() {
    return {
      "Esc": 27,
      "Enter": 13,
      "i": 73,
      "j": 74,
      "k": 75,
      "y": 89,
      "l": 76,
      "h": 72,
      "f": 70
    };
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
