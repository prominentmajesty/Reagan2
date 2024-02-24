import mongoose from "mongoose";

const primarySchema = new mongoose.Schema(
    {
        
    },
    {timestamps : true}
);

export const Primary = mongoose.models?.Primary || mongoose.model('Primary', primarySchema);