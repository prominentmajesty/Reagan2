import mongoose, { Schema } from "mongoose";

const parentSchema  = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    Name : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true,
    },

    state : {
        type : String,
        required : true,
    },

    image : {
        type : String,
    },

    LGA : {
        type : String,
        required : true
    },

    Phone : {
        type : String,
        required : true,
    }

},
    {timestamps : true}
);
export const Parents = mongoose.models?.Parents || mongoose.model('Parents', parentSchema);