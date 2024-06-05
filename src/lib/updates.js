import mongoose from "mongoose";

const updatesSchema = new mongoose.Schema({

    category : {
       type : String,
       required : true
    },

    subject : {
        type : String,
        required : true
    },

    updates : {
        type : String,
        required : true
    },

    date : {
        type : String,
        required : true
    }
},
    {timestamps : true}
);

export const Updates = mongoose.models?.Updates || mongoose.model('Updates', updatesSchema);