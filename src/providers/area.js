
const { Area } = require('../models');
const mongoose = require('mongoose')

const _getAreasList = async () => {
    try {
        const sort = { areaName: 1};
        const areas = await Area.find().sort(sort).lean().exec();
        return areas;
    }
    catch(ex) {
        console.log(`cannot get Areas List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getAreasListWithClusters = async () => {
    try {
        const sort = { areaName: 1};
        const populatedArea = await Area.find().sort(sort).populate("clusters");
        return populatedArea;

    }
    catch(ex) {
        console.log(`cannot get Areas List With Clusters from db. ${ex}`);
        return Promise.reject();
    }
};

const _getAreaById = async (areaId) => {
    try {
        const area = await Area.findOne({
            _id: mongoose.Types.ObjectId(areaId)}).lean().exec();
        return area;
    }
    catch(ex) {
        console.log(`cannot get Area By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getAreaByAreaName = async (areaName) => {
    try {
        const area = await Area.findOne({
            areaName: areaName
        }).lean().exec();
        return area;
    }
    catch(ex) {
        console.log(`cannot get Area By AreaName from db. ${ex}`);
        return Promise.reject();
    }
};

const _getAreaByIdWithClusters = async (areaId) => {
    try {
        const populatedArea = await Area.findById(areaId).populate("clusters");
        return populatedArea;
    }
    catch(ex) {
        console.log(`cannot get Area By Id With Clusters from db. ${ex}`);
        return Promise.reject();
    }
};

const _createArea = async (area) => {
    try {
        const newArea = new Area(area);
        await newArea.save();
        return newArea
    }
    catch(ex) {
        console.log(`cannot create area in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateArea = async (areaId, area) => {
    try {
        await Area.findByIdAndUpdate({
            _id: areaId
        }, area);
        return;
    }
    catch(ex) {
        console.log(`cannot update area in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteArea = async (areaId) => {
    try {
        await Area.deleteOne({
            _id: areaId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete area from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {

    getAreasList: () => {
        return _getAreasList();
    },

    getAreasListWithClusters: () => {
        return _getAreasListWithClusters();
    },
    
    getAreaById: (areaId) => {
        return _getAreaById(areaId);
    },

    getAreaByAreaName: (areaName) => {
        return _getAreaByAreaName(areaName);
    },

    getAreaByIdWithClusters: (areaId) => {
        return _getAreaByIdWithClusters(areaId);
    },

    createArea: (area) => {
        return _createArea(area);
    },

    updateArea: (areaId, area) => {
        return _updateArea(areaId, area);
    },

    deleteArea: (areaId) => {
        return _deleteArea(areaId);
    }
}