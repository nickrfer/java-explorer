var apiCrawler = require('./apiCrawler');
var jsonfile = require('jsonfile');
var fs = require('fs');

var javadocs7 = '../json/javadocs7.json';
var javadocs8 = '../json/javadocs8.json';

exports.createJson = function() {
  apiCrawler.crawl(apiCrawler.java7, createJson7);
}

function createJson7(json) {
  jsonfile.writeFile(javadocs7, json, function (err) {
    console.error(err); 
  });
}
