const mongoose = require('mongoose');


const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: 'Restaurant name is required',
        trim: true
    },


    owner: {
        type: mongoose.SchemaTypes.ObjectId,
       
    },

    caseins: {
        type:[],
        required:"Add at least 1 casein"
    },
    location:{
        type: String,
        required: 'Restaurant Location is required',

    }


}, {timestamps: true});


module.exports = mongoose.model('Restaurant', RestaurantSchema);
