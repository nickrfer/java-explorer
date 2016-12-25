var cheerio = require('cheerio');
var apiDetailCrawler = require('./apiDetailCrawler');
var apiRequest = require('./apiRequest');

exports.java6 = "1.6";
exports.java7 = "1.7";
exports.java8 = "1.8";

const allClassesPath = '/allclasses-frame.html';
var basePath = {};
basePath[exports.java6] = 'https://docs.oracle.com/javase/6/docs/api';
basePath[exports.java7] = 'https://docs.oracle.com/javase/7/docs/api';
basePath[exports.java8] = 'https://docs.oracle.com/javase/8/docs/api';

var apiJson;
var flushJsonCallback;

function ApiPath(detailPath, name) {
    this.detailPath = detailPath;
    this.name = name;
}

exports.crawl = function(javaVersion, callback) {
    flushJsonCallback = callback;
    apiJson = {"types" : []};
    var path = basePath[javaVersion];
    apiRequest.onRequestSuccess(path + allClassesPath, function(html) {
      parseAllClasses(html, path, javaVersion);
    });
}

function parseAllClasses(html, path, javaVersion) {
  var $ = cheerio.load(html);
  var paths = [];
  $('a').each(function(i, element) {
      var a = $(this);
      var href = a.attr('href');
      var apiName = href.substring(0, href.indexOf('.html'));
      var apiPath = new ApiPath(path + '/' + href, apiName);
      paths.push(apiPath);
  });
  console.log(paths);
  crawApiDetails(paths, javaVersion, 0);
}

function crawApiDetails(paths, javaVersion, currentIndex) {
    if (paths.length <= currentIndex) {
        flushJsonCallback(apiJson);
        return;
    }
    apiRequest.onRequestSuccess(paths[currentIndex].detailPath, function(html) {
        parseApiDetails(paths[currentIndex], html, javaVersion);
        // the if bellow is used for development, comment out in production
        if (apiJson["types"].length > 3) {
          currentIndex += 999999;
        }
        crawApiDetails(paths, javaVersion, ++currentIndex);
    });
}

function parseApiDetails(path, html, javaVersion) {
  var apiType = apiDetailCrawler.crawl(path, html, javaVersion);
  if (apiType != null) {
    var typeJson = JSON.stringify(apiType);
    apiJson["types"].push(typeJson);
    console.log(typeJson);
  }
}
