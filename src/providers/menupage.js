
const { MenuPage } = require('../models');
const mongoose = require('mongoose')

const _getPageItemsList = async () => {
    try {
        const pageItems = await MenuPage.find().lean().exec();
        return pageItems;
    }
    catch(ex) {
        console.log(`cannot get PageItems List from db. ${ex}`);
        return Promise.reject();
    }
};

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
    getPageItemsList: () => {
        return _getPageItemsList();
    },
    
    getPageItemsListByPageName: (pageName) => {
        return _getPageItemsListByPageName(pageName);
    }
}