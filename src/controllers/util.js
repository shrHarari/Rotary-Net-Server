const { utilProvider } = require('../providers');

module.exports = {
    
    checkDb: async (req, res) => {
        try {
            const retVal = await utilProvider.checkDb();
            res.send(retVal);
        }
        catch(ex) {
            console.log(`error in DataBase Check - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    uploadPersoncardImage: async (req, res) => {
        try {
            const personCardImageFile = req.files['personCardImage'][0];
            console.log(">>> OK: personCard FILE " + personCardImageFile.path);

            // const currentPersonCardImage = req.files['image'];
            // console.log(">>> OK: currentPersonCardImage " + currentPersonCardImage);

            ////////////////////////
            // const personCardImageFile = req.file;
            // const {personBody} = req.body;
            // console.log(">>> OK: personBodye " + personBody);
            const retVal = await utilProvider.uploadPersoncardImage(personCardImageFile);
            res.send(retVal);
        }
        catch(ex) {
            console.log(`error in Upload File - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    signS3: async (req, res) => {
        try {
            const { fileName } = req.body.fileName;
            const { fileType } = req.body.fileType;

            const returnData = await utilProvider.signS3(fileName, fileType);

            console.log(">>> returnData: " + returnData);
            // res.write(JSON.stringify(returnData));
            // res.end();

            res.send(returnData);
        }
        catch(ex) {
            console.log(`error in signS3 File to AWS - ${ex}`);
            res.status(500).send('error in AWS server');
        }
    },

    generatePreSignedUrl: async (req, res) => {
        try {
            const { fileName } = req.params;
            const { fileType } = req.params;
            if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg") {
              return res
                .status(403)
                .json({ success: false, message: "Image format invalid" });
            }

            const aFileType = fileType.substring(1, fileType.length);   // ["jgg" || "png" || "jpeg"]
            console.log(">>> Controller / generatePresignedUrl /// fileName: " + fileName + ' >>> fileType: ' + aFileType);

            const returnData = await utilProvider.generatePreSignedUrl(fileName, aFileType);

            console.log(">>> returnData: " + returnData);
            return res.status(201).json(returnData);
        }
        catch(ex) {
            console.log(`error in signS3 File to AWS - ${ex}`);
            res.status(500).send('error in AWS server');
        }
    },

    uploadAwsPersoncardImage: async (req, res) => {
        try {
            const personCardImageFile = req.files['personCardImage'][0];
            const retVal = await utilProvider.uploadAwsPersoncardImage(personCardImageFile);
            res.send(retVal);
        }
        catch(ex) {
            console.log(`error in Upload File to AWS - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    
    deletePersoncardImage: async (req, res) => {
        try {
            const { personCardImageFile } = req.params;
            console.log(">>> fileNameToDelete " + personCardImageFile);

            const retVal = await utilProvider.deletePersoncardImage(personCardImageFile);
            res.send(retVal);
        }
        catch(ex) {
            console.log(`error in Delete File - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    getPersoncardImageFile: async (req, res) => {
        try {
            const { personCardImageFile } = req.params;
            console.log(">>> fileNameToGet " + personCardImageFile);

            const retVal = await utilProvider.getPersoncardImageFile(personCardImageFile);
            res.send(retVal);
        }
        catch(ex) {
            console.log(`error in Getting Image File - ${ex}`);
            res.status(500).send('error in server');
        }
    }
}