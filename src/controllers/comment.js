const { commentProvider } = require('../providers');

module.exports = {

    getCommentsList: async (req, res) => {
        try {
            const comments = await commentProvider.getCommentsList();
            res.send(comments);
        }
        catch(ex) {
            console.log(`error getting comments - ${ex}`);
            res.status(500).send('error in server');
        }
    }
}