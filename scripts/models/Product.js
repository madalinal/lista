/**
 * Created by Madalina.Lacatus on 7/7/2015.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
    denumire: String,
    amanunte: String,
    cumparat: Boolean,
    editare:Boolean
});

module.exports = mongoose.model('Product', ProductSchema);