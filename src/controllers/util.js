const { utilProvider } = require('../providers');

module.exports = {
    
    uploadPersoncardImage: async (req, res) => {
        try {
            const personCardImageFile = req.files['personCardImage'][0];
            console.log(">>> OK: personCard FILE " + personCardImageFile);

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