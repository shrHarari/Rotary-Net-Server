const { areaProvider } = require('../providers');

module.exports = {

    getAreasList: async (req, res) => {
        try {
            const areas = await areaProvider.getAreasList();
            res.send(areas);
        }
        catch(ex) {
            console.log(`error getting Areas List - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getAreasListWithClusters: async (req, res) => {
        try {
            const areas = await areaProvider.getAreasListWithClusters();
            res.send(areas);
        }
        catch(ex) {
            console.log(`error getting Areas List With Clusters - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getAreaById: async (req, res) => {
        try {
            const { areaId } = req.params; 
            const area = await areaProvider.getAreaById(areaId);
            res.send(area);
        }
        catch(ex) {
            console.log(`error getting Area By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getAreaByAreaName: async (req, res) => {
        try {
            const { areaName } = req.params; 
            const area = await areaProvider.getAreaByAreaName(areaName);
            res.send(area);
        }
        catch(ex) {
            console.log(`error getting Area By AreaName - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getAreaByIdWithClusters: async (req, res) => {
        try {
            const { areaId } = req.params; 
            const areas = await areaProvider.getAreaByIdWithClusters(areaId);
            res.send(areas);
        }
        catch(ex) {
            console.log(`error getting Area By Id With Clusters - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createArea: async (req, res) => {
        try {
            const area = req.body;
            await areaProvider.createArea(area);
            res.send(true);
        }
        catch(ex) {
            console.log(`error creating area - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateArea: async (req, res) => {
        try {
            const { areaId } = req.params;
            const area = req.body;
            await areaProvider.updateArea(areaId, area);
            res.send(true);
        }
        catch(ex) {
            console.log(`error updating area - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteArea: async (req, res) => {
        try {
            const { areaId } = req.params;
            await areaProvider.deleteArea(areaId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting area - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}