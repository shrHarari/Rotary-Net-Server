

module.exports.accessKeyId = process.env.AWSAccessKeyId
module.exports.secretAccessKey = process.env.AWSSecretKey

module.exports.roteryNetBucketName = process.env.S3_ROTARY_NET_BUCKET || 'rotary-net-bucket';
// module.exports.roteryNetBucketName = process.env.S3_BUCKET_PERSON_CARD_IMAGES || 'rotary-net-person-card-images';
module.exports.region = "us-east-1";
