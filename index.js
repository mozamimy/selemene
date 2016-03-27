'use string';

const search_endpoint = 'http://api.giphy.com/v1/gifs/search?'
const api_key = 'dc6zaTOxFJmzC';

var searchBox = document.getElementById('search_keyword');
searchBox.focus();

var resultArea = document.getElementById('resut_area');

var renderResult = function(resources) {
  resources.data.forEach(function(resource) {
    var imageArea = document.createElement('div');

    var image = document.createElement('img');
    image.src = resource['images']['original']['url'];
    image.id = resource['id'];

    imageArea.appendChild(image);
    resultArea.appendChild(imageArea);
  });
}

var search = function() {
  var Client = require('node-rest-client').Client;
  var client = new Client;

  var url = search_endpoint + 'q=' + searchBox.value + '&api_key=' + api_key;

  client.get(url, function(resources, response) {
    if (response.statusCode == 200) {
      renderResult(resources);
    }
  });
};

searchBox.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    search();
  }
});
