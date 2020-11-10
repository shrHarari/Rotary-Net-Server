
const { Area } = require('../models');
const { Cluster } = require('../models');
const mongoose = require('mongoose')

const _getClustersList = async () => {
    try {
        const sort = { clusterName: 1};
        const clusters = await Cluster.find().sort(sort).lean().exec();
        return clusters;
    }
    catch(ex) {
        console.log(`cannot get Clusters List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClustersListWithClubs = async () => {
    try {
        const sort = { clusterName: 1};
        const populatedCluster = await Cluster.find().sort(sort).populate("clubs");
        return populatedCluster;

    }
    catch(ex) {
        console.log(`cannot get Clusters List With Clubs from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClusterById = async (clusterId) => {
    try {
        const cluster = await Cluster.findOne({
            _id: mongoose.Types.ObjectId(clusterId)
        }).lean().exec();
        return cluster;
    }
    catch(ex) {
        console.log(`cannot get Cluster By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClusterByClusterName = async (clusterName) => {
    try {
        const cluster = await Cluster.findOne({
            clusterName: clusterName
        }).lean().exec();
        return cluster;
    }
    catch(ex) {
        console.log(`cannot get Cluster By ClusterName from db. ${ex}`);
        return Promise.reject();
    }
};

const _getClusterByIdWithClubs = async (clusterId) => {
    try {
        const populatedCluster = await Cluster.findById(clusterId).populate("clubs");
        return populatedCluster;
    }
    catch(ex) {
        console.log(`cannot get Cluster By Id With Clubs from db. ${ex}`);
        return Promise.reject();
    }
};

const _createCluster = async (areaId, cluster) => {
    try {
        const newCluster = new Cluster(cluster);
        
        return newCluster.save().then(docCluster => {

            return Area.findByIdAndUpdate(
                areaId,
                { $push: { clusters: docCluster._id } },
                { new: true, useFindAndModify: false }
            );
        });
    }   
    catch(ex) {
        console.log(`cannot create Cluster in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateCluster = async (clusterId, cluster) => {
    try {
        await Cluster.findByIdAndUpdate({
            _id: clusterId
        }, cluster);
        return;
    }
    catch(ex) {
        console.log(`cannot update Cluster in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteCluster = async (clusterId) => {
    try {
        await Cluster.deleteOne({
            _id: clusterId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete Cluster from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {

    getClustersList: () => {
        return _getClustersList();
    },

    getClustersListWithClubs: () => {
        return _getClustersListWithClubs();
    },

    getClusterById: (clusterId) => {
        return _getClusterById(clusterId);
    },

    getClusterByClusterName: (clusterName) => {
        return _getClusterByClusterName(clusterName);
    },

    getClusterByIdWithClubs: (clusterId) => {
        return _getClusterByIdWithClubs(clusterId);
    },

    createCluster: (areaId, cluster) => {
        return _createCluster(areaId, cluster);
    },

    updateCluster: (clusterId, cluster) => {
        return _updateCluster(clusterId, cluster);
    },

    deleteCluster: (clusterId) => {
        return _deleteCluster(clusterId);
    }
}