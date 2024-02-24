import mongoose from "mongoose";

const studentSchema  = new mongoose.Schema({

    firstName : {
        type : String,
        required : true
    },

    otherNames : {
        type : String,
        required : true
    },

    Age : {
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

    parent : {
        type : Schema.Types.ObjectId,
        ref : 'Parents'
    },

    primary : {
        type : Schema.Types.ObjectId,
        ref : 'Primary'
    },

    secondary : {
        type : Schema.Types.ObjectId,
        ref : 'Secondary'
    }

},
    {timestamps : true}
);

export const Students = mongoose.models?.Students || mongoose.model('Students', studentSchema);