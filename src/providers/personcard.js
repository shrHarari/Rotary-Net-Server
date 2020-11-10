
const { User } = require('../models');
const { PersonCard } = require('../models');
const mongoose = require('mongoose')

const _getPersonCardsList = async () => {
    try {
        const sort = { firstName: 1, lastName: 1 };
        const personCards = await PersonCard.find().sort(sort).lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListPopulated = async () => {
    try {
        const sort = { firstName: 1, lastName: 1 };
        const personCards = await PersonCard.find().sort(sort)
                .populate("areaId")
                .populate("clusterId")
                .populate("clubId")
                .populate("roleId");
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardById = async (personCardId) => {
    try {
        const personCard = await PersonCard.findOne({_id: mongoose.Types.ObjectId(personCardId)}).lean().exec();
        return personCard;
    }
    catch(ex) {
        console.log(`cannot get PersonCard By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardByIdPopulated = async (personCardId) => {
    try {

        const personCard = await PersonCard.findOne({_id: mongoose.Types.ObjectId(personCardId)})
        .populate({
            path:'areaId',
            model:'Area'
        })
        .populate({
            path:'clusterId',
            model:'Cluster'
        })
        .populate({
            path:'clubId',
            model:'Club'
        })
        .populate({
            path:'roleId',
            model:'Role'
        })

        return personCard;
    }
    catch(ex) {
        console.log(`cannot get PersonCard By Id Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardByIdMessagePopulated = async (personCardId) => {
    try {

        const personCard = await PersonCard.findOne({_id: mongoose.Types.ObjectId(personCardId)})
        .populate({
            path:'messages',
            model:'Message',
            populate:{
                path:'composerId',
                model:'PersonCard',
                populate: [
                    {
                        path:'areaId',
                        model:'Area',
                        select: '_id areaName'
                    },
                    {
                        path:'clusterId',
                        model:'Cluster',
                        select: '_id clusterName'
                    },
                    {
                        path:'clubId',
                        model:'Club',
                        select: '_id clubName clubAddress clubMail clubManagerGuidId'
                    },
                    {
                        path:'roleId',
                        model:'Role',
                        select: '_id roleEnum roleName'
                    }
                ]
            }
        })

        return personCard;
    }
    catch(ex) {
        console.log(`cannot get PersonCard By Id Message Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardByIdAllPopulated = async (personCardId) => {
    try {

        const personCard = await PersonCard.findOne({_id: mongoose.Types.ObjectId(personCardId)})
        .populate({
            path:'areaId',
            model:'Area'
        })
        .populate({
            path:'clusterId',
            model:'Cluster'
        })
        .populate({
            path:'clubId',
            model:'Club'
        })
        .populate({
            path:'roleId',
            model:'Role'
        })
        .populate({
            path:'messages',
            model:'Message',
            populate:{
                path:'composerId',
                model:'PersonCard',
            }
        })

        return personCard;
    }
    catch(ex) {
        console.log(`cannot get PersonCard By Id All Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByName = async (firstName, lastName) => {
    try {
        searchStr = {
            firstName: { $regex: firstName, $options: 'ig'},
            lastName:  { $regex: lastName, $options: 'ig'}
        }
        const sort = { firstName: 1, lastName: 1 };
        const personCards = await PersonCard.find(searchStr).sort(sort).lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Name from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByNamePopulated = async (firstName, lastName) => {
    try {
        searchStr = {
            firstName: { $regex: firstName, $options: 'ig'},
            lastName:  { $regex: lastName, $options: 'ig'}
        }
        const sort = { firstName: 1, lastName: 1 };
        const personCards = await PersonCard.find(searchStr).sort(sort)
            .populate("areaId")
            .populate("clusterId")
            .populate("clubId")
            .populate("roleId");
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get personCards By Name Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByQuery = async (query) => {
    try {
        
        // const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        // const searchRgx = rgx(query);

        searchStr = {
            $or: [
                {firstName: {$regex: query, $options: 'ig'}}, 
                {lastName: {$regex: query, $options: 'ig'}}
            ]}
            
        const personCards = await PersonCard.find(searchStr).lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Query from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByQueryPopulated = async (query) => {
    try {
        searchStr = {
            $or: [
                {firstName: {$regex: query, $options: 'ig'}}, 
                {lastName: {$regex: query, $options: 'ig'}}
            ]}
            
        const personCards = await PersonCard.find(searchStr)
                .populate("areaId")
                .populate("clusterId")
                .populate("clubId")
                .populate("roleId");
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Query Populated from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByRoleHierarchyAll = async () => {
    try {
        const personCards = await PersonCard.find()
            .select('_id')
            .lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Role Hierarchy All from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByRoleHierarchyAreaId = async (areaId) => {
    try {
        const personCards = await PersonCard.find( {areaId: areaId} )
            .select('_id')
            .lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Role Hierarchy AreaId from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByRoleHierarchyClusterId = async (clusterId) => {
    try {
        const personCards = await PersonCard.find( {clusterId: clusterId})
        .select('_id')
        .lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Role Hierarchy ClusterId from db. ${ex}`);
        return Promise.reject();
    }
};

const _getPersonCardsListByRoleHierarchyClubId = async (clubId) => {
    try {
        const personCards = await PersonCard.find( {clubId: clubId} )
        .select('_id')
        .lean().exec();
        return personCards;
    }
    catch(ex) {
        console.log(`cannot get PersonCards List By Role Hierarchy ClubId from db. ${ex}`);
        return Promise.reject();
    }
};

const _createPersonCard = async (userId, personCard) => {
    try {
        const newPersonCard = new PersonCard(personCard);
        
        return newPersonCard.save().then( docPersonCard => {

            return User.findByIdAndUpdate(
                userId,
                { personCardId: docPersonCard._id },
                { new: true, useFindAndModify: true }
                // { new: true, useFindAndModify: false }
            );
        });
    }
    catch(ex) {
        console.log(`cannot create PersonCard in db. ${ex}`);
        return Promise.reject();
    }
};

const _updatePersonCard = async (personCardId, personCard) => {
    try {
        const updatedPersonCard = await PersonCard.findByIdAndUpdate(
            {_id: personCardId}, 
            personCard,
            { new: true, useFindAndModify: false }
        );
        
        return(updatedPersonCard);
    }
    catch(ex) {
        console.log(`cannot update PersonCard in db. ${ex}`);
        return Promise.reject();
    }
};

const _deletePersonCard = async (personCardId) => {
    try {
        await PersonCard.deleteOne({
            _id: personCardId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete PersonCard from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getPersonCardsList: () => {
        return _getPersonCardsList();
    },

    getPersonCardsListPopulated: () => {
        return _getPersonCardsListPopulated();
    },

    getPersonCardById: (personCardId) => {
        return _getPersonCardById(personCardId);
    },

    getPersonCardByIdPopulated: (personCardId) => {
        return _getPersonCardByIdPopulated(personCardId);
    },

    getPersonCardByIdMessagePopulated: (personCardId) => {
        return _getPersonCardByIdMessagePopulated(personCardId);
    },

    getPersonCardByIdAllPopulated: (personCardId) => {
        return _getPersonCardByIdAllPopulated(personCardId);
    },
    
    getPersonCardsListByName: (firstName, lastName) => {
        return _getPersonCardsListByName(firstName, lastName);
    },
    
    getPersonCardsListByNamePopulated: (firstName, lastName) => {
        return _getPersonCardsListByNamePopulated(firstName, lastName);
    },
    
    getPersonCardsListByQuery: (query) => {
        return _getPersonCardsListByQuery(query);
    },
    
    getPersonCardsListByQueryPopulated: (query) => {
        return _getPersonCardsListByQueryPopulated(query);
    },
    
    getPersonCardsListByRoleHierarchyAll: () => {
        return _getPersonCardsListByRoleHierarchyAll();
    },
    
    getPersonCardsListByRoleHierarchyAreaId: (areaId) => {
        return _getPersonCardsListByRoleHierarchyAreaId(areaId);
    },
    
    getPersonCardsListByRoleHierarchyClusterId: (clusterId) => {
        return _getPersonCardsListByRoleHierarchyClusterId(clusterId);
    },
    
    getPersonCardsListByRoleHierarchyClubId: (clubId) => {
        return _getPersonCardsListByRoleHierarchyClubId(clubId);
    },
    
    createPersonCard: (userId, personCard) => {
        return _createPersonCard(userId, personCard);
    },

    updatePersonCard: (personCardId, personCard) => {
        return _updatePersonCard(personCardId, personCard);
    },

    deletePersonCard: (personCardId) => {
        return _deletePersonCard(personCardId);
    }
}