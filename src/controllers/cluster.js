const { clusterProvider } = require('../providers');

module.exports = {

    getClustersList: async (req, res) => {
        try {
            const clusters = await clusterProvider.getClustersList();
            res.send(clusters);
        }
        catch(ex) {
            console.log(`error getting Clusters List - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClustersListWithClubs: async (req, res) => {
        try {
            const clusters = await clusterProvider.getClustersListWithClubs();
            res.send(clusters);
        }
        catch(ex) {
            console.log(`error getting Clusters List With Clubs - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClusterById: async (req, res) => {
        try {
            const { clusterId } = req.params; 
            const cluster = await clusterProvider.getClusterById(clusterId);
            res.send(cluster);
        }
        catch(ex) {
            console.log(`error getting Cluster By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClusterByClusterName: async (req, res) => {
        try {
            const { clusterName } = req.params; 
            const cluster = await clusterProvider.getClusterByClusterName(clusterName);
            res.send(cluster);
        }
        catch(ex) {
            console.log(`error getting Cluster By ClusterName - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClusterByIdWithClubs: async (req, res) => {
        try {
            const { clusterId } = req.params; 
            const cluster = await clusterProvider.getClusterByIdWithClubs(clusterId);
            res.send(cluster);
        }
        catch(ex) {
            console.log(`error getting Cluster By Id With Clubs - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createCluster: async (req, res) => {
        try {
            const { areaId } = req.params; 
            const cluster = req.body;
            await clusterProvider.createCluster(areaId, cluster);
            res.send(true);
        }
        catch(ex) {
            console.log(`error creating cluster - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateCluster: async (req, res) => {
        try {
            const { clusterId } = req.params;
            const cluster = req.body;
            await clusterProvider.updateCluster(clusterId, cluster);
            res.send(true);
        }
        catch(ex) {
            console.log(`error updating cluster - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteCluster: async (req, res) => {
        try {
            const { clusterId } = req.params;
            await clusterProvider.deleteCluster(clusterId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting cluster - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}