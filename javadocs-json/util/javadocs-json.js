var apiCrawler = require('./apiCrawler');
var jsonfile = require('jsonfile');

var javadocs6 = './json/javadocs6.json';
var javadocs7 = './json/javadocs7.json';
var javadocs8 = './json/javadocs8.json';

exports.createJson = function() {
  jsonfile.writeFile(javadocs6,
    apiCrawler.crawl(apiCrawler.java6), function (err) {
    console.error(err);
  });

  /*jsonfile.writeFile(javadocs7,
    apiCrawler.crawl(apiCrawler.java7), function (err) {
    console.error(err);
  });

  jsonfile.writeFile(javadocs8,
    apiCrawler.crawl(apiCrawler.java8), function (err) {
    console.error(err);
  });*/
}
