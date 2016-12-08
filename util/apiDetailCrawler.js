var cheerio = require('cheerio');

exports.crawl = function(html, javaVersion) {
    var $ = cheerio.load(html);
    console.log(html.includes(javaVersion));
}
