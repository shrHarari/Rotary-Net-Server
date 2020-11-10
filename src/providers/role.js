
const { Role } = require('../models');
const mongoose = require('mongoose')

const _getRolesList = async () => {
    try {
        const sort = { roleName: 1};
        const roles = await Role.find().sort(sort).lean().exec();
        return roles;
    }
    catch(ex) {
        console.log(`cannot get Roles List from db. ${ex}`);
        return Promise.reject();
    }
};

const _getRoleById = async (roleId) => {
    try {
        const role = await Role.findOne({
            _id: mongoose.Types.ObjectId(roleId)
        }).lean().exec();
        return role;
    }
    catch(ex) {
        console.log(`cannot get Role By id from db. ${ex}`);
        return Promise.reject();
    }
};

const _getRoleByEnum = async (roleEnum) => {
    try {
        const role = await Role.findOne({
            roleEnum: roleEnum
        }).lean().exec();
        return role;
    }
    catch(ex) {
        console.log(`cannot get Role By Enum from db. ${ex}`);
        return Promise.reject();
    }
};

const _getRoleByRoleName = async (roleName) => {
    try {
        const role = await Role.findOne({
            roleName: roleName
        }).lean().exec();
        return role;
    }
    catch(ex) {
        console.log(`cannot get Role by RoleName from db. ${ex}`);
        return Promise.reject();
    }
};

const _createRole = async (role) => {
    try {
        console.log(role);
        const newRole = new Role(role);
        await newRole.save();
        return newRole
    }
    catch(ex) {
        console.log(`cannot create Role in db. ${ex}`);
        return Promise.reject();
    }
};

const _updateRole = async (roleId, role) => {
    try {
        await Role.findByIdAndUpdate({
            _id: roleId
        }, role);
        return;
    }
    catch(ex) {
        console.log(`cannot update Role in db. ${ex}`);
        return Promise.reject();
    }
};

const _deleteRole = async (roleId) => {
    try {
        await Role.deleteOne({
            _id: roleId
        });
        return;
    }
    catch(ex) {
        console.log(`cannot delete Role from db. ${ex}`);
        return Promise.reject();
    }
};

module.exports = {
    getRolesList: () => {
        return _getRolesList();
    },

    getRoleById: (roleId) => {
        return _getRoleById(roleId);
    },

    getRoleByEnum: (roleEnum) => {
        return _getRoleByEnum(roleEnum);
    },

    getRoleByRoleName: (roleName) => {
        return _getRoleByRoleName(roleName);
    },

    createRole: (role) => {
        return _createRole(role);
    },

    updateRole: (roleId, role) => {
        return _updateRole(roleId, role);
    },

    deleteRole: (roleId) => {
        return _deleteRole(roleId);
    }
}