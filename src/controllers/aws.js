
const { awsProvider } = require('../providers');

module.exports = {
    generatePreSignedUrl: async (req, res) => {
        try {
            const fileName = req.body.fileName;
            const fileType = req.body.fileType;
            const bucketFolderName = req.body.bucketFolderName;
            if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg") {
              return res
                .status(403)
                .json({ success: false, message: "Image format invalid" });
            }

            const aFileType = fileType.substring(1, fileType.length);   // ["jpg" || "png" || "jpeg"]

            await awsProvider.generatePreSignedUrl(fileName, aFileType, bucketFolderName, function(preSignedUrlResponse)
            {
                return res.status(201).json(preSignedUrlResponse);
            });
        }
        catch(ex) {
            console.log(`error in Generate Pre Signed Url to AWS - ${ex}`);
            res.status(500).send('error in Generate Pre Signed Url to AWS Server');
        }
    },

    deleteFile: async (req, res) => {
        try {
            const fileName = req.body.fileName;
            const bucketFolderName = req.body.bucketFolderName;
            await awsProvider.deleteFile(fileName, bucketFolderName, function(deleteResponse)
            {
                return res.status(202).json(deleteResponse);
            });
        }
        catch(ex) {
            console.log(`error deleting AWS File - ${ex}`);
            res.status(500).send('error in deleting File from AWS Server');
        }
    },
}