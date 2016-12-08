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

exports.crawl = function(javaVersion) {
    apiJson = {"types" : []};
    var path = basePath[javaVersion];
    apiRequest.onRequestSuccess(path + allClassesPath, function(html) {
        var $ = cheerio.load(html);
        var paths = [];
        $('a').each(function(i, element) {
            var a = $(this);
            var detailPath = path + '/' + a.attr('href');
            paths.push(detailPath);
        });
        console.log(paths);
        crawApiDetails(paths, javaVersion, 0);
    });
    return apiJson;
}

function crawApiDetails(paths, javaVersion, currentIndex) {
    if (paths.length <= currentIndex) {
        return;
    }
    apiRequest.onRequestSuccess(paths[currentIndex], function(html) {
        var typeJson = apiDetailCrawler.crawl(html, javaVersion);
        if (typeJson != null) {
          apiJson["types"].push(typeJson);
          console.log(typeJson);
        }
        crawApiDetails(paths, javaVersion, ++currentIndex);
    });
}
