import mongoose, { Schema } from "mongoose";

const parentSchema  = new mongoose.Schema({

    firstname : {
        type : String,
        required : true,
    },

    othernames : { 
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
    },

    phone : {
        type : String,
        required : true,
    },

    gender : { 
        type : String,
        required : true
    },

    LGA : {
        type : String,
        required : true
    },

    city : {
        type : String,
        required : true,
    },

    nationality : { 
        type : String,
        required : true
    },

    image : {
        type : String,
    },
},
    {timestamps : true}
);
export const Parents = mongoose.models?.Parents || mongoose.model('Parents', parentSchema);