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
    imageArea.classList.add('image_area');

    var image = document.createElement('img');
    image.src = resource['images']['original']['url'];

    imageArea.appendChild(image);
    resultArea.appendChild(imageArea);
  });
}

var search = function() {
  var Client = require('node-rest-client').Client;
  var client = new Client;
  var encodedKeyword = encodeURIComponent(searchBox.value);
  var url = search_endpoint + 'q=' + encodedKeyword + '&api_key=' + api_key;

  currentImageArea = null;

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
      currentImageArea.classList.remove('current');
      currentImageArea = currentImageArea.nextSibling;
    }
  }

  currentImageArea.classList.add('current');
  location.hash = currentImageArea.id
}

var moveToPreviousImage = function() {
  if (currentImageArea == null) {
    currentImageArea = resultArea.firstChild
  } else {
    if (currentImageArea.previousSibling) {
      currentImageArea.classList.remove('current');
      currentImageArea = currentImageArea.previousSibling;
    }
  }

  currentImageArea.classList.add('current');
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
  } else if (e.keyCode == 73) {
    if (document.activeElement != searchBox) {
      searchBox.focus();
      e.preventDefault();
    }
  } else if (e.keyCode == 74) {
    if (document.activeElement != searchBox) {
      moveToNextImage();
    }
  } else if (e.keyCode == 75) {
    if (document.activeElement != searchBox) {
      moveToPreviousImage();
    }
  } else if (e.keyCode == 89) {
    if (currentImageArea) {
      var copyPaste = require('copy-paste');

      var textForCopy = '![LGTM](' + currentImageArea.firstChild.src + ')';
      copyPaste.copy(textForCopy);
      document.title = 'Copied | ' + textForCopy;

      setTimeout(function() {
        document.title = 'Selemene';
      }, 3000);
    }
  }
});
