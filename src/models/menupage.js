const mongoose = require('mongoose');

const menuPageSchema = new mongoose.Schema({

  pageName: { type: String },
  pageItems: [
    {
      itemName: { type: String },
      itemContent: { type: String }
    }
  ]
});

const MenuPage = mongoose.model('MenuPage', menuPageSchema);

module.exports = MenuPage;