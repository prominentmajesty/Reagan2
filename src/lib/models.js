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

        firstName : {
            type : String,
        },

        otherNames : {
            type : String,
        },

        contact : {
            type : String,
        },

        LGA : {
            type : String,
        },

        State : {
            type : String,
        },

        Nationality : {
            type : String,
        },

        Address : {
            type : String,
        },

        isTeacher: {
            type : Boolean,
            default : true
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