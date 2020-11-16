
var fs = require('fs');
var aws = require('aws-sdk');

aws.config.region = 'us-east-1';

const S3_BUCKET_PERSON_CARD_IMAGES = process.env.S3_BUCKET_PERSON_CARD_IMAGES;

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

        const s3 = new aws.S3();
        
        const s3Params = {
            Bucket: S3_BUCKET_PERSON_CARD_IMAGES,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.end();
            }

            const returnData = {
                signedRequest: data,
                url: `https://${S3_BUCKET_PERSON_CARD_IMAGES}.s3.amazonaws.com/${fileName}`
            };

            res.write(JSON.stringify(returnData));
            res.end();
        });

        // return returnData;
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