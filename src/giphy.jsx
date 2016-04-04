'use strict';

import { Client as RestClient } from 'node-rest-client';

class Giphy {
  static get API_ENDPOINT() {
    return 'http://api.giphy.com/v1/gifs/search?'
  }

  // TODO: Modify to api key owned by Selemene.
  static get API_KEY() {
    return 'dc6zaTOxFJmzC';
  }

  search(keyword, resultArea) {
    let client = new RestClient;
    let encodedKeyword = encodeURIComponent(keyword);
    let url = Giphy.API_ENDPOINT + 'q=' + encodedKeyword + '&api_key=' + Giphy.API_KEY;

    client.get(url, (resources, response) => {
      if (response.statusCode == 200) {
        this._renderResult(resources, resultArea);
      }
    });
  }

  _renderResult(resources, resultArea) {
    this._clear(resultArea);

    resources.data.forEach(resource () => {
      let imageArea = document.createElement('div');
      imageArea.id = resource['id'];
      imageArea.classList.add('image_area');

      let image = document.createElement('img');
      image.src = resource['images']['original']['url'];

      imageArea.appendChild(image);
      resultArea.appendChild(imageArea);
    });
  }

  _clear(resultArea) {
    while (resultArea.firstChild) {
      resultArea.removeChild(resultArea.firstChild);
    }
  }
}
