const { menuPageProvider } = require('../providers');

module.exports = {
    
    getPageItemsListByPageName: async (req, res) => {
        try {
            const { pageName } = req.params;

            const menuPageItems = await menuPageProvider.getPageItemsListByPageName(pageName);
            res.send(menuPageItems);
        }
        catch(ex) {
            console.log(`error getting PageItems by PageName - ${ex}`);
            res.status(500).send('error in server');
        }
    }
}