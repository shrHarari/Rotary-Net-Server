
const { Hero } = require('../models');
const mongoose = require('mongoose')

const _getHeroes = async () => {
    try {
          const heroes = await Hero.find().select('_id id name ');
          return heroes;
    }
    catch(ex) {
        console.log(`cannot get Heroes from db. ${ex}`);
        return Promise.reject();
    }
};

const _getHeroById = async (heroId) => {
    try {
        const hero = await Hero.findOne({_id: mongoose.Types.ObjectId(heroId)}).lean().exec();
        // const hero = await Hero.findOne({_id: heroId}).lean().exec();
        return hero;
    }
    catch(ex) {
        console.log(`cannot get Hero By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getHeroesListByQuery = async (query) => {
    try {
        searchStr = {
            $or: [
                {name: {$regex: query, $options: 'ig'}}
            ]}
            
        const heroes = await Hero.find(searchStr).lean().exec();
        return heroes;
    }
    catch(ex) {
        console.log(`cannot get Heroes List By Query from db. ${ex}`);
        return Promise.reject();
    }
};


const _createHero = async (hero) => {
    try {
        const newHero = new Hero(hero);
        
        const savedHero = await  newHero.save();
        
        return savedHero;
    }
    catch(ex) {
        console.log(`cannot create Hero in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateHero = async (heroId, hero) => {
    try {
        const updatedHero = await Hero.findByIdAndUpdate(
            {_id: heroId}, 
            hero,
            { new: true, useFindAndModify: false }
        );
        
        return(updatedHero);
    }
    catch(ex) {
        console.log(`cannot update Hero in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteHero = async (heroId) => {
    try {
        await Hero.deleteOne({
            _id: heroId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete Hero from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getHeroes: () => {
        return _getHeroes();
    },

    getHeroById: (heroId) => {
        return _getHeroById(heroId);
    },
    
    getHeroesListByQuery: (query) => {
        return _getHeroesListByQuery(query);
    },
    
    createHero: (hero) => {
        return _createHero(hero);
    },

    updateHero: (heroId, hero) => {
        return _updateHero(heroId, hero);
    },

    deleteHero: (heroId) => {
        return _deleteHero(heroId);
    }
}