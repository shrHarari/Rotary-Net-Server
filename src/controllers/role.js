const { roleProvider } = require('../providers');

module.exports = {

    getRolesList: async (req, res) => {
        try {
            const roles = await roleProvider.getRolesList();
            res.send(roles);
        }
        catch(ex) {
            console.log(`error getting roles - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getRoleById: async (req, res) => {
        try {
            const { roleId } = req.params; 
            const role = await roleProvider.getRoleById(roleId);
            res.send(role);
        }
        catch(ex) {
            console.log(`error getting role by id - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getRoleByEnum: async (req, res) => {
        try {
            const { roleEnum } = req.params; 
            const role = await roleProvider.getRoleByEnum(roleEnum);
            res.send(role);
        }
        catch(ex) {
            console.log(`error getting role by Enum - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    getRoleByRoleName: async (req, res) => {
        try {
            const { roleName } = req.params; 
            const role = await roleProvider.getRoleByRoleName(roleName);
            res.send(role);
        }
        catch(ex) {
            console.log(`error getting role by RoleName - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    createRole: async (req, res) => {
        try {
            const role = req.body;
            await roleProvider.createRole(role);
            res.send(true);
        }
        catch(ex) {
            console.log(`error creating role - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    updateRole: async (req, res) => {
        try {
            const { roleId } = req.params;
            const role = req.body;
            await roleProvider.updateRole(roleId, role);
            res.send(true);
        }
        catch(ex) {
            console.log(`error updating role - ${ex}`);
            res.status(500).send('error in server');
        }
    },

    deleteRole: async (req, res) => {
        try {
            const { roleId } = req.params;
            await roleProvider.deleteRole(roleId);
            res.send(true);
        }
        catch(ex) {
            console.log(`error deleting role - ${ex}`);
            res.status(500).send('error in server');
        }
    },
}