var request = require('request');
var cheerio = require('cheerio');

const allClassesPath = '/allclasses-frame.html';

exports.basePathJava6 = 'https://docs.oracle.com/javase/6/docs/api';
exports.basePathJava7 = 'https://docs.oracle.com/javase/7/docs/api';
exports.basePathJava8 = 'https://docs.oracle.com/javase/8/docs/api';
var count = 0;

exports.crawl = function(path) {
  onRequestSuccess(path + allClassesPath, function(html) {
    var $ = cheerio.load(html);
    var paths = [];
    $('a').each(function(i, element) {
      var a = $(this);
      var detailPath = path + '/' + a.attr('href');
      paths.push(detailPath);
    });
    crawApiDetails(paths, 0);
  });
}

function crawApiDetails(paths, currentIndex) {
  if (paths.length <= currentIndex) {
    return;
  }
  console.log(paths[currentIndex]);

  onRequestSuccess(paths[currentIndex], function(html) {
    crawApiDetails(paths, ++currentIndex);
  });
}

function onRequestSuccess(path, callback) {
  request(path, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      callback(html);
    } else {
      console.log('Error trying to access path: ' + path + '; ' + error);
    }
  });
}
