
const { MenuPage } = require('../models');

const _getPageItemsListByPageName = async (pageName) => {
    try {
        const pageItems = await MenuPage.findOne({
            pageName: pageName
        })
        .select('pageItems').lean().exec();
        
        return pageItems;
    }
    catch(ex) {
        console.log(`cannot get PageItems List By PageName from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    
    getPageItemsListByPageName: (pageName) => {
        return _getPageItemsListByPageName(pageName);
    }
}