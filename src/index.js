'use strict';

const keyCode = {
  "Esc": 27,
  "i": 73,
  "j": 74,
  "k": 75,
  "y": 89
}

var searchBox = document.getElementById('search_keyword');
searchBox.focus();

var resultArea = document.getElementById('resut_area');

var currentImageArea = null;

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
    currentImageArea = null;

    var giphy = new Giphy;
    giphy.search(searchBox.value, resultArea);
  }
});

var checkActive = function(domObject) {
  return (document.activeElement != domObject);
}

document.addEventListener('keydown', function(e) {
  if (e.keyCode == keyCode["Esc"]) {
    searchBox.blur();
  } else if (e.keyCode == keyCode["i"]) {
    if (checkActive(searchBox)) {
      searchBox.focus();
      e.preventDefault();
    }
  } else if (e.keyCode == keyCode["j"]) {
    if (checkActive(searchBox)) {
      moveToNextImage();
    }
  } else if (e.keyCode == keyCode["k"]) {
    if (checkActive(searchBox)) {
      moveToPreviousImage();
    }
  } else if (e.keyCode == keyCode["y"]) {
    if (currentImageArea && checkActive(searchBox)) {
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
