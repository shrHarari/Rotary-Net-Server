
var fs = require('fs');

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
    
    uploadPersoncardImage: (personCardImageFile) => {
        return _uploadPersoncardImage(personCardImageFile);
    },
    
    deletePersoncardImage: (personCardImageFile) => {
        return _deletePersoncardImage(personCardImageFile);
    },
    
    getPersoncardImageFile: (personCardImageFile) => {
        return _getPersoncardImageFile(personCardImageFile);
    }
}