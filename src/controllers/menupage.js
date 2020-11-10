const { menuPageProvider } = require('../providers');

module.exports = {

    getPageItemsList: async (req, res) => {
        try {
            const menuPageItems = await menuPageProvider.getPageItemsList();
            res.send(menuPageItems);
        }
        catch(ex) {
            console.log(`error getting PageItems - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
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