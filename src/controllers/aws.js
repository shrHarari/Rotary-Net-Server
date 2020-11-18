
const { awsProvider } = require('../providers');

module.exports = {
    generatePreSignedUrl: async (req, res) => {
        try {
            const fileName = req.body.fileName;
            const fileType = req.body.fileType;
            if (fileType != ".jpg" && fileType != ".png" && fileType != ".jpeg") {
              return res
                .status(403)
                .json({ success: false, message: "Image format invalid" });
            }

            const aFileType = fileType.substring(1, fileType.length);   // ["jgg" || "png" || "jpeg"]

            await awsProvider.generatePreSignedUrl(fileName, aFileType, function(preSignedUrlResponse)
            {
                return res.status(201).json(preSignedUrlResponse);
            });
        }
        catch(ex) {
            console.log(`error in Generate Pre Signed Url to AWS - ${ex}`);
            res.status(500).send('error in Generate Pre Signed Url to AWS Server');
        }
    }
}