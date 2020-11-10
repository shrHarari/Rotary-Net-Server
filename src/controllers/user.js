const express = require('express')
const app = express()

const { userProvider } = require('../providers');

module.exports = {
    
    getUsersList: async (req, res) => {
        try {
            const users = await userProvider.getUsersList();
            res.send(users);
        }
        catch(ex) {
            console.log(`error getting Users List - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getUserById: async (req, res) => {
        try {
            const { userId } = req.params; 
            const user = await userProvider.getUserById(userId);
            res.send(user);
        }
        catch(ex) {
            console.log(`error getting User By Id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getUserByEmail: async (req, res) => {
        try {
            const { email } = req.params; 
            const user = await userProvider.getUserByEmail(email);
            res.send(user);
        }
        catch(ex) {
            console.log(`error getting User By Email - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    getUsersListByName: async (req, res) => {
        try {
            const { firstName } = req.params; 
            const { lastName } = req.params; 
            const users = await userProvider.getUsersListByName(firstName, lastName);
            res.send(users);
        }
        catch(ex) {
            console.log(`error getting Users List By Name - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getUsersListByQuery: async (req, res) => {
        try {
            const { query } = req.params; 
            const users = await userProvider.getUsersListByQuery(query);
            res.send(users);
        }
        catch(ex) {
            console.log(`error getting Users List By Query - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            const createdUser = await userProvider.createUser(user);
            res.send(createdUser);
        }
        catch(ex) {
            console.log(`error create User - ${ex}`);
            res.status(500).send('error in server');
        }
    },
    
    confirmUserByEmailAndPassword: async (req, res) => {
        try {
            const loginUser = req.body;

            const connectedUser = await userProvider.confirmUserByEmailAndPassword(
                loginUser.email, 
                loginUser.password);

            res.send(connectedUser);
        }
        catch(ex) {
            console.log(`error confirm User By EmailAndPassword - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const user = req.body;
            const updatedUser = await userProvider.updateUser(userId, user);
            res.send(updatedUser);
        }
        catch(ex) {
            console.log(`error update User - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            await userProvider.deleteUser(userId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error delete User - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}