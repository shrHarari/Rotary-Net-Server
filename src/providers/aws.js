
// var fs = require('fs');
// const express = require("express");
const AWS = require('aws-sdk');
const awsConfig = require("../services/config-aws");

// var bodyParser = require("body-parser");
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// AWS.config.update({ region: awsConfig.region });

const s3 = new AWS.S3({
    accessKeyId: awsConfig.accessKeyId,
    secretAccessKey: awsConfig.secretAccessKey,
    region: awsConfig.region,
    signatureVersion: "v4",
});

const S3_ROTARY_NET_BUCKET = process.env.S3_ROTARY_NET_BUCKET || 'rotary-net-bucket';

const _generatePreSignedUrl = async (fileName, fileType, bucketFolderName, preSignedUrlCallback) => {
    try {
        var returnData = undefined;
        var folderName = '';

        if (bucketFolderName != '') folderName = bucketFolderName + '/';

        const s3Params = {
            Bucket: S3_ROTARY_NET_BUCKET,
            // Key: 'PersonCardImages/' + fileName,
            Key: folderName + fileName,
            Expires: 60,
            ContentType: "image/" + fileType,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                returnData = {
                    success: false,
                    message: "Error: Something went wrong! --->>> " + err,
                };
            }
            else {
                returnData = {
                    success: true,
                    message: "Url Generated",
                    uploadBucketUrl: data,
                    downloadImageUrl: `https://${S3_ROTARY_NET_BUCKET}.s3.amazonaws.com/${folderName}${fileName}`
                };
            };
            preSignedUrlCallback(returnData);
        });
        return;
    }
    catch(ex) {
        console.log(`Uploading AWS File Error. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    
    generatePreSignedUrl: (fileName, fileType, bucketFolderName, preSignedUrlCallback) => {
        return _generatePreSignedUrl(fileName, fileType, bucketFolderName, preSignedUrlCallback);
    }
}