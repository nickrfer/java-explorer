var cheerio = require('cheerio');

function TypeInfo(name) {
    this.name = name;
}

exports.crawl = function(html, javaVersion) {
    var $ = cheerio.load(html);
    if ($("body:contains('" + javaVersion + "')").length > 0) {
      return $('h2').text();
    }
}
