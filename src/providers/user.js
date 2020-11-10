
const { User } = require('../models');
const mongoose = require('mongoose')

const _getUsersList = async () => {
    try {
        const sort = { firstName: 1, lastName: 1 };
        const users = await User.find().sort(sort).lean().exec();
        return users;
    }
    catch(ex) {
        console.log(`cannot get Users List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getUserById = async (userId) => {
    try {
        const user = await User.findOne({
            _id: mongoose.Types.ObjectId(userId)
        }).lean().exec();
        return user;
    }
    catch(ex) {
        console.log(`cannot get User By Id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            email: email
        }).lean().exec();
        return user;
    }
    catch(ex) {
        console.log(`cannot get User By Email from db. ${ex}`);
        return Promise.reject();
    }
};

const _getUsersListByName = async (firstName, lastName) => {
    try {
        const sort = { firstName: 1, lastName: 1 };
        const users = await User.find({
            firstName: { $regex: firstName, $options: 'ig'},
            lastName:  { $regex: lastName, $options: 'ig'}
        }).sort(sort).lean().exec();
        return users;
    }
    catch(ex) {
        console.log(`cannot get Users List By Name from db. ${ex}`);
        return Promise.reject();
    }
};

const _getUsersListByQuery = async (query) => {
    try {
        searchStr = {
            $or: [
                {firstName: {$regex: query, $options: 'ig'}}, 
                {lastName: {$regex: query, $options: 'ig'}}
            ]}
            
        const users = await User.find(searchStr).lean().exec();
        return users;
    }
    catch(ex) {
        console.log(`cannot get Users List By Query from db. ${ex}`);
        return Promise.reject();
    }
};

const _createUser = async (user) => {
    try {
        const newUser = new User(user);
        // await newUser.save(function(err, createdUser){
        //     // console.log(createdUser);
        //     return createdUser;
        // });
        const createdUser = await newUser.save();
        return createdUser;
    }
    catch(ex) {
        console.log(`cannot create User in db. ${ex}`);
        return Promise.reject();
    }
};

const _confirmUserByEmailAndPassword = async (email, password) => {
    try {
        searchStr = {
            $and: [
                {email: email}, 
                {password: password}
            ]}
            
        const user = await User.findOne(searchStr).lean().exec();
        return user;
    }
    catch(ex) {
        console.log(`cannot Confirm User By EmailAndPassword in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateUser = async (userId, user) => {
    try {
        const updatedUser = await User.findByIdAndUpdate({_id: userId}, user);
        return(updatedUser);
    }
    catch(ex) {
        console.log(`cannot update User in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteUser = async (userId) => {
    try {
        await User.deleteOne({
            _id: userId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete User from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getUsersList: () => {
        return _getUsersList();
    },

    getUserById: (userId) => {
        return _getUserById(userId);
    },

    getUserByEmail: (email) => {
        return _getUserByEmail(email);
    },
    
    getUsersListByName: (firstName, lastName) => {
        return _getUsersListByName(firstName, lastName);
    },
    
    getUsersListByQuery: (query) => {
        return _getUsersListByQuery(query);
    },

    createUser: (user) => {
        return _createUser(user);
    },

    confirmUserByEmailAndPassword: (email, password) => {
        return _confirmUserByEmailAndPassword(email, password);
    },

    updateUser: (userId, user) => {
        return _updateUser(userId, user);
    },

    deleteUser: (userId) => {
        return _deleteUser(userId);
    }
}