const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clusterSchema = new mongoose.Schema({

  clusterName: { type: String },
  clubs: [{ type: Schema.Types.ObjectId, ref: 'Club' }]
});

const Cluster = mongoose.model('Cluster', clusterSchema);

module.exports = Cluster;