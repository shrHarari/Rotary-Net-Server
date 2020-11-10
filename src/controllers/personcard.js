const { personCardProvider } = require('../providers');

module.exports = {
    
    getPersonCardsList: async (req, res) => {
        try {
            const personCards = await personCardProvider.getPersonCardsList();
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    getPersonCardsListPopulated: async (req, res) => {
        try {
            const personCards = await personCardProvider.getPersonCardsListPopulated();
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardById: async (req, res) => {
        try {
            const { personCardId } = req.params; 
            const personCard = await personCardProvider.getPersonCardById(personCardId);
            res.send(personCard);
        }
        catch(ex) {
            console.log(`error getting PersonCard By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardByIdPopulated: async (req, res) => {
        try {
            const { personCardId } = req.params; 
            const personCard = await personCardProvider.getPersonCardByIdPopulated(personCardId);
            res.send(personCard);
        }
        catch(ex) {
            console.log(`error getting PersonCard By Id Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardByIdMessagePopulated: async (req, res) => {
        try {
            const { personCardId } = req.params; 
            const personCard = await personCardProvider.getPersonCardByIdMessagePopulated(personCardId);
            res.send(personCard);
        }
        catch(ex) {
            console.log(`error getting PersonCard By Id Message Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardByIdAllPopulated: async (req, res) => {
        try {
            const { personCardId } = req.params; 
            const personCard = await personCardProvider.getPersonCardByIdAllPopulated(personCardId);
            res.send(personCard);
        }
        catch(ex) {
            console.log(`error getting PersonCard By Id All Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    getPersonCardsListByName: async (req, res) => {
        try {
            const { firstName } = req.params; 
            const { lastName } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByName(firstName, lastName);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Name - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    getPersonCardsListByNamePopulated: async (req, res) => {
        try {
            const { firstName } = req.params; 
            const { lastName } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByNamePopulated(firstName, lastName);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Name Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByQuery: async (req, res) => {
        try {
            const { query } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByQuery(query);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Query - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByQueryPopulated: async (req, res) => {
        try {
            const { query } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByQueryPopulated(query);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Query Populated - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByRoleHierarchyAll: async (req, res) => {
        try {
            const personCards = await personCardProvider.getPersonCardsListByRoleHierarchyAll();
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Role Hierarchy All - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByRoleHierarchyAreaId: async (req, res) => {
        try {
            const { areaId } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByRoleHierarchyAreaId(areaId);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Role Hierarchy AreaId - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByRoleHierarchyClusterId: async (req, res) => {
        try {
            const { clusterId } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByRoleHierarchyClusterId(clusterId);
            res.send(personCards);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Role Hierarchy ClusterId - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getPersonCardsListByRoleHierarchyClubId: async (req, res) => {
        try {
            const { clubId } = req.params; 
            const personCards = await personCardProvider.getPersonCardsListByRoleHierarchyClubId(clubId);
            res.send(personCard);
        }
        catch(ex) {
            console.log(`error getting PersonCards List By Role Hierarchy ClubId - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createPersonCard: async (req, res) => {
        try {
            const { userId } = req.params; 
            const personCard = req.body;
            const createdPesronCard = await personCardProvider.createPersonCard(userId, personCard);
            res.send(createdPesronCard);
        }
        catch(ex) {
            console.log(`error create PersonCard - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updatePersonCard: async (req, res) => {
        try {
            const { personCardId } = req.params;
            const personCard = req.body;
            const updatedPersonCard = await personCardProvider.updatePersonCard(personCardId, personCard);
            res.send(updatedPersonCard);
        }
        catch(ex) {
            console.log(`error update PersonCard - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deletePersonCard: async (req, res) => {
        try {
            const { personCardId } = req.params;
            await personCardProvider.deletePersonCard(personCardId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error delete PersonCard - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}