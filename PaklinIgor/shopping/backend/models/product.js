const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        name: {type:String,required: true},
        description: {type: String, default: ''},
        quantity: {type:Number,required: true},
        bought: {type: Number, default: 0}
    }
);

module.exports = mongoose.model('Product', Product);