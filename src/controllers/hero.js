const { heroProvider } = require('../providers');

module.exports = {

    getHeroes: async (req, res) => {
        try {
            const heroes = await heroProvider.getHeroes();
            res.send(heroes);
        }
        catch(ex) {
            console.log(`error getting Heroes - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getHeroById: async (req, res) => {
        try {
            const { heroId } = req.params; 
            const hero = await heroProvider.getHeroById(heroId);
            res.send(hero);
        }
        catch(ex) {
            console.log(`error getting Hero By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getHeroesListByQuery: async (req, res) => {
        try {
            const { query } = req.params; 
            const Heroes = await heroProvider.getHeroesListByQuery(query);
            res.send(Heroes);
        }
        catch(ex) {
            console.log(`error getting Heroes List By Query - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createHero: async (req, res) => {
        try {
            const hero = req.body;
            const createdHero = await heroProvider.createHero(hero);
            res.send(createdHero);
        }
        catch(ex) {
            console.log(`error create Hero - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateHero: async (req, res) => {
        try {
            const { heroId } = req.params;
            const hero = req.body;
            const updatedHero = await heroProvider.updateHero(heroId, hero);
            res.send(updatedHero);
        }
        catch(ex) {
            console.log(`error update Hero - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteHero: async (req, res) => {
        try {
            const { heroId } = req.params;
            await heroProvider.deleteHero(heroId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error delete Hero - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}