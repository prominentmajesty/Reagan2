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

    gender : {
        type : String,
        required : true,
    },

    classAdmited : {
        type : String,
        required : true
    },

    section: {
        type : String,
        required : true
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

    reasults : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Results'
    },

},
    {timestamps : true}
);

export const Students = mongoose.models?.Students || mongoose.model('Students', studentSchema);