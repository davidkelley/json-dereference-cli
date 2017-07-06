var S3 = require('aws-sdk/clients/s3');

module.exports = {
  order: 1,

  canRead: /^s3:/i,

  read: function(file, callback) {
    var params;

    if (this.bucket) {
      var parts = file.url.match(/^s3:\/\/(.+)$/);
      params = { Bucket: this.bucket, Key: parts[1] };
    } else {
      var parts = file.url.match(/^s3:\/\/(.+?)\/(.+)$/);
      params = { Bucket: parts[1], Key: parts[2] };
    }

    if (!(params.Bucket && params.Key)) {
      callback(new Error("Malformed params object: " + file.url));
    } else {
      var s3 = new S3();

      s3.getObject(params, function(err, data) {
        if (err) {
          callback(err);
        } else {
          callback(null, data.Body.toString());
        }
      });
    }
  }
};
