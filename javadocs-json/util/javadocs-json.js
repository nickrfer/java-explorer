var apiCrawler = require('./apiCrawler');
var jsonfile = require('jsonfile');
var fs = require('fs');

var javadocs6 = '../json/javadocs6.json';
var javadocs7 = '../json/javadocs7.json';
var javadocs8 = '../json/javadocs8.json';

exports.createJson = function() {
  apiCrawler.crawl(apiCrawler.java6, createJson6);
}

function createJson6(json) {
  jsonfile.writeFile(javadocs6, json, function (err) {
    console.error(err);
  });
}
