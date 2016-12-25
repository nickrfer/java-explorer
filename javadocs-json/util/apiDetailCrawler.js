var cheerio = require('cheerio');

function ApiType(name, fullType, packageName, description, path, newType) {
    this.name = name;
    this.fullType = fullType;
    this.packageName = packageName;
    this.description = description;
    this.path = path;
    this.newType = newType;
}

exports.crawl = function(apiPath, html, javaVersion) {
    var $ = cheerio.load(html);
    if ($("body:contains('" + javaVersion + "')").length > 0) {
      var fullType = $('h2 .header').text();
      var packageName = $('.header .subTitle').text();
      var description = $('.description ul li pre').text();
      var newType = isNewType($, javaVersion);

      return new ApiType(apiPath.name, fullType, packageName, description, apiPath.detailPath, newType);
    }
}

function isNewType($, javaVersion) {
  return $('.description ul li').children('dl').children('dd:contains("' + javaVersion + '")').length > 0;
}
