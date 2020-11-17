
var fs = require('fs');
const AWS = require('aws-sdk');
const awsConfig = require("./config-aws");
var bodyParser = require("body-parser");

const S3_BUCKET_PERSON_CARD_IMAGES = process.env.S3_BUCKET_PERSON_CARD_IMAGES || 'rotary-net-person-card-images';

const _checkDb = async () => {
    try {
        return ('DataBase Check: OK');
    }
    catch(ex) {
        console.log(`DataBase Check Error. ${ex}`);
        return Promise.reject();
    }
};

const _uploadPersoncardImage = async (personCardImageFile) => {
    try {
        var src = fs.createReadStream(personCardImageFile.path);
        var dest = fs.createWriteStream('PersonCardImages/' + personCardImageFile.originalname);

        src.pipe(dest);

        src.on('end', function() {
            fs.unlinkSync(personCardImageFile.path);
            console.log(">>> OK: Received " + personCardImageFile.originalname);
            return('OK: Received: ' + personCardImageFile.originalname);
        });

        src.on('error', function(err) { 
            return('Error: Something went wrong!'); 
        });
      
        return true;
    }
    catch(ex) {
        console.log(`Uploading File Error. ${ex}`);
        return Promise.reject();
    }
};

const _signS3 = async (fileName, fileType) => {
    try {
        console.log(">>> signS3 /// fileName: " + fileName + ' >>> fileType: ' + fileType);
        console.log(">>> S3_BUCKET_PERSON_CARD_IMAGES: " + S3_BUCKET_PERSON_CARD_IMAGES);
        
        // AWS.config.region = 'us-east-1';
        AWS.config.update({region: 'us-east-1'});
        // AWS.config.update({region: 'REGION'});

        AWS.config.getCredentials(function(err) {
            if (err) console.log(err.stack);
            // credentials not loaded
            else {
                console.log("Access key:", AWS.config.credentials.accessKeyId);
                console.log("Secret Access Key:", AWS.config.credentials.secretAccessKey);
            }
        });

        const s3 = new AWS.S3();
        // s3 = new AWS.S3({apiVersion: '2006-03-01'});
        const s3 = new AWS.S3({
            accessKeyId: AWS.config.credentials.accessKeyId,
            secretAccessKey: AWS.config.credentials.secretAccessKey,
            region: awsConfig.region,
            signatureVersion: "v4",
            //   useAccelerateEndpoint: true
        });
        
        // Call S3 to list the buckets
        s3.listBuckets(function(err, data) {
            if (err) {
            console.log("Error", err);
            } else {
            console.log("Success", data.Buckets);
            }
        });

        const s3Params = {
            Bucket: S3_BUCKET_PERSON_CARD_IMAGES,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                return('Error: Something went wrong!'); 
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET_PERSON_CARD_IMAGES}.s3.amazonaws.com/${fileName}`
            };
            console.log(">>> returnData: " + returnData);
            return returnData;
        });
    }
    catch(ex) {
        console.log(`Uploading AWS File Error. ${ex}`);
        return Promise.reject();
    }
};


const _generatePreSignedUrl = async (fileName, fileType) => {
    try {
    //     console.log(">>> generatePresignedUrl /// fileName: " + fileName + ' >>> fileType: ' + fileType);
        console.log(">>> S3_BUCKET_PERSON_CARD_IMAGES: " + S3_BUCKET_PERSON_CARD_IMAGES);
        
        AWS.config.update({ region: awsConfig.region });

        const s3 = new AWS.S3({
            accessKeyId: awsConfig.accessKeyId,
            secretAccessKey: awsConfig.secretAccessKey,
            region: awsConfig.region,
            signatureVersion: "v4",
            //   useAccelerateEndpoint: true
        });

        const s3Params = {
            Bucket: S3_BUCKET_PERSON_CARD_IMAGES,
            Key: fileName,
            Expires: 60,
            ContentType: "image/" + fileType,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                const returnData = {
                    success: false,
                    message: "Error: Something went wrong!",
                };
                return(returnData); 
            }

            const returnData = {
                success: true,
                message: "Url generated",
                uploadUrl: data,
                downloadUrl: `https://${S3_BUCKET_PERSON_CARD_IMAGES}.s3.amazonaws.com/` + fileName,
            };
            console.log(">>> returnData: " + returnData);
            return returnData;
        });
    }
    catch(ex) {
        console.log(`Uploading AWS File Error. ${ex}`);
        return Promise.reject();
    }
};

const _uploadAwsPersoncardImage = async (personCardImageFile) => {
    try {
        var src = fs.createReadStream(personCardImageFile.path);
        var dest = fs.createWriteStream('PersonCardImages/' + personCardImageFile.originalname);

        src.pipe(dest);

        src.on('end', function() {
            fs.unlinkSync(personCardImageFile.path);
            console.log(">>> OK: Received " + personCardImageFile.originalname);
            return('OK: Received: ' + personCardImageFile.originalname);
        });

        src.on('error', function(err) { 
            return('Error: Something went wrong!'); 
        });
      
        return true;
    }
    catch(ex) {
        console.log(`Uploading File Error. ${ex}`);
        return Promise.reject();
    }
};

const _deletePersoncardImage = async (personCardImageFile) => {
    try {
        var del = fs.unlinkSync('PersonCardImages/' + personCardImageFile);
        return true;
    }
    catch(ex) {
        console.log(`Deleting File Error. ${ex}`);
        return Promise.reject();
    }
};

const _getPersoncardImageFile = async (personCardImageFile) => {
    try {
        // read file from file system
        fs.readFile('PersonCardImages/' + personCardImageFile, function(err, data){
            return(data);
        });
        return true;
    }
    catch(ex) {
        console.log(`Deleting File Error. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    
    checkDb: () => {
        return _checkDb();
    },
    
    uploadPersoncardImage: (personCardImageFile) => {
        return _uploadPersoncardImage(personCardImageFile);
    },
    
    signS3: (fileName, fileType) => {
        return _signS3(fileName, fileType);
    },
    
    generatePreSignedUrl: (fileName, fileType) => {
        return _generatePreSignedUrl(fileName, fileType);
    },
    
    uploadAwsPersoncardImage: (personCardImageFile) => {
        return _uploadAwsPersoncardImage(personCardImageFile);
    },
    
    deletePersoncardImage: (personCardImageFile) => {
        return _deletePersoncardImage(personCardImageFile);
    },
    
    getPersoncardImageFile: (personCardImageFile) => {
        return _getPersoncardImageFile(personCardImageFile);
    }
}