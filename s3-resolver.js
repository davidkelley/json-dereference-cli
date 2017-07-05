var S3 = require('aws-sdk/clients/s3');

module.exports = {
  order: 1,

  canRead: /^s3:/i,

  read: function(file, callback) {
    var parts = file.url.match(/^s3:\/\/(.+?)\/(.+)$/);
    var s3 = new S3();
    var params = { Bucket: parts[1], Key: parts[2] };

    s3.getObject(params, function(err, data) {
      if (err) {
        callback(err);
      } else {
        callback(null, data.Body.toString());
      }
    });
  }
};
