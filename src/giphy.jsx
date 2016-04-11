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

    return new Promise((resolve, reject) => {
      client.get(url, (resources, response) => {
        if (response.statusCode == 200) {
          resolve(resources);
        } else {
          reject(new Error(response.statusCode));
        }
      });

    });
  }
}
