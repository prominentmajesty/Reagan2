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

    image : {
        type : String,
    },

    parentphone : {
        type : String,
        required : true
    },

    parent : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Parents'
    },

    reasults : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Results'
    },

},
    {timestamps : true}
);

export const Students = mongoose.models?.Students || mongoose.model('Students', studentSchema);