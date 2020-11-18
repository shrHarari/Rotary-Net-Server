
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

const S3_BUCKET_PERSON_CARD_IMAGES = process.env.S3_BUCKET_PERSON_CARD_IMAGES || 'rotary-net-person-card-images';

const _generatePreSignedUrl = async (fileName, fileType, preSignedUrlCallback) => {
    try {
        console.log(">>> generatePresignedUrl /// fileName: " + fileName + ' >>> fileType: ' + fileType);
        
        var returnData = undefined;
        const s3Params = {
            Bucket: S3_BUCKET_PERSON_CARD_IMAGES,
            Key: 'PersonCardImages/' + fileName,
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
                    message: "Url generated",
                    uploadBucketUrl: data,
                    downloadImageUrl: `https://${S3_BUCKET_PERSON_CARD_IMAGES}.s3.amazonaws.com/${fileName}`
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
    
    generatePreSignedUrl: (fileName, fileType, preSignedUrlCallback) => {
        return _generatePreSignedUrl(fileName, fileType, preSignedUrlCallback);
    }
}