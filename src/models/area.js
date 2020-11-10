const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const areaSchema = new mongoose.Schema({

  areaName: { type: String },
  clusters: [{ type: Schema.Types.ObjectId, ref: 'Cluster' }]
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;