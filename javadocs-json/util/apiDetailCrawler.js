var cheerio = require('cheerio');

function ApiType(fullType, packageName, description, path, newType) {
    this.fullType = fullType;
    this.packageName = packageName;
    this.description = description;
    this.path = path;
    this.newType = newType;
}

exports.crawl = function(path, html, javaVersion, path) {
    var $ = cheerio.load(html);
    if ($("body:contains('" + javaVersion + "')").length > 0) {
      var fullType = $('h2 .header').text();
      var packageName = $('.header .subTitle').text();
      var description = $('.description ul li pre').text();
      var newType = isNewType($, javaVersion);

      return new ApiType(fullType, packageName, description, path, newType);
    }
}

function isNewType($, javaVersion) {
  return $('.description ul li').children('dl').children('dd:contains("' + javaVersion + '")').length > 0;
}
