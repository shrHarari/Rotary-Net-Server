const { clubProvider } = require('../providers');

module.exports = {

    getClubsList: async (req, res) => {
        try {
            const clubs = await clubProvider.getClubsList();
            res.send(clubs);
        }
        catch(ex) {
            console.log(`error getting clubs - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClubById: async (req, res) => {
        try {
            const { clubId } = req.params; 
            const club = await clubProvider.getClubById(clubId);
            res.send(club);
        }
        catch(ex) {
            console.log(`error getting club by id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getClubByClubName: async (req, res) => {
        try {
            const { clubName } = req.params; 
            const club = await clubProvider.getClubByClubName(clubName);
            res.send(club);
        }
        catch(ex) {
            console.log(`error getting club by ClubName - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createClub: async (req, res) => {
        try {
            const { clusterId } = req.params; 
            const club = req.body;
            await clubProvider.createClub(clusterId, club);
            res.send(true);
        }
        catch(ex) {
            console.log(`error creating CLUB - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateClub: async (req, res) => {
        try {
            const { clubId } = req.params;
            const club = req.body;
            await clubProvider.updateClub(clubId, club);
            res.send(true);
        }
        catch(ex) {
            console.log(`error updating club - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteClub: async (req, res) => {
        try {
            const { clubId } = req.params;
            await clubProvider.deleteClub(clubId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting club - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}