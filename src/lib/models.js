import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email : {
            type : String,
            required : true,
            unique : true,
            min : 3,
            max : 50,
        },

        password : {
            type : String,
        },

        img : {
            type : String,
        },

        firstname : {
            type : String,
        },

        othernames : {
            type : String,
        },

        section : {
            type : String,
        },

        contact : {
            type : String,
        },

        LGA : {
            type : String,
        },

        state : {
            type : String,
        },

        nationality : {
            type : String,
        },

        address : {
            type : String,
        },

        isTeacher: {
            type : Boolean,
            default : false
        },

        isAdmin : {
            type : Boolean,
            default : false
        }
    },
    {
        timestamps : true
    }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);