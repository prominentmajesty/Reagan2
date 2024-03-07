import mongoose from "mongoose";

const studentSchema  = new mongoose.Schema({

    regNo : {
        type : String,
        required : true
    },

    firstname : {
        type : String,
        required : true
    },

    othernames : {
        type : String,
        required : true
    },

    age : {
        type : String,
        required : true,
    },

    address : {
        type : String,
        required : true,
    },

    parentphone : {
        type : String,
        required : true
    },

    image : {
        type : String,
    },

    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Parents'
    },

    primary : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Primary'
    },

    secondary : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Secondary'
    }

},
    {timestamps : true}
);

export const Students = mongoose.models?.Students || mongoose.model('Students', studentSchema);