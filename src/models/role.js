const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

  roleEnum: {type: Number},
  roleName: {type: String}
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;