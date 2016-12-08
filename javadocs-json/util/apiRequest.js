var request = require('request');

exports.onRequestSuccess = function(path, callback) {
    request(path, function(error, response, html) {
        if (!error && response.statusCode == 200) {
            callback(html);
        } else {
            console.log('Error trying to access path: ' + path + '; ' + error);
        }
    });
}
