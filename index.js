'use string';

const search_endpoint = 'http://api.giphy.com/v1/gifs/search?'
const api_key = 'dc6zaTOxFJmzC';

var searchBox = document.getElementById('search_keyword');
searchBox.focus();

var resultArea = document.getElementById('resut_area');

var currentImageArea = null;

var renderResult = function(resources) {
  while (resultArea.firstChild) {
    resultArea.removeChild(resultArea.firstChild);
  }

  resources.data.forEach(function(resource) {
    var imageArea = document.createElement('div');
    imageArea.id = resource['id'];

    var image = document.createElement('img');
    image.src = resource['images']['original']['url'];

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

var moveToNextImage = function() {
  if (currentImageArea == null) {
    currentImageArea = resultArea.firstChild
  } else {
    if (currentImageArea.nextSibling) {
      currentImageArea = currentImageArea.nextSibling;
    }
  }

  location.hash = currentImageArea.id
}

var moveToPreviousImage = function() {
  if (currentImageArea == null) {
    currentImageArea = resultArea.firstChild
  } else {
    if (currentImageArea.previousSibling) {
      currentImageArea = currentImageArea.previousSibling;
    }
  }

  location.hash = currentImageArea.id
}

searchBox.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    search();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.keyCode == 27) {
    searchBox.blur();
  } else if (e.keyCode == 83) {
    searchBox.focus();
  } else if (e.keyCode == 74) {
    if (document.activeElement != searchBox) {
      moveToNextImage();
    }
  } else if (e.keyCode == 75) {
    if (document.activeElement != searchBox) {
      moveToPreviousImage();
    }
  } else if (e.keyCode == 67) {
    if (currentImageArea) {
      var copyPaste = require('copy-paste');

      var textForCopy = '![LGTM](' + currentImageArea.firstChild.src + ')';
      copyPaste.copy(textForCopy);
    }
  }
});
