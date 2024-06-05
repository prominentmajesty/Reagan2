import { connectToDb } from "@/lib/utils";
import { Updates } from "@/lib/updates";

export const PATCH = async (request, { params }) => {
    const { subject, update } = await request.json();
      const _id = params._id;
    
    try {
        connectToDb()

       const res = await Updates.findByIdAndUpdate({_id}, {$set : {subject, updates : update}})
        
        return new Response(JSON.stringify(res), {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 

export const DELETE = async (request, { params }) => {
      const _id = params._id;
    try {
        connectToDb()

       const res = await Updates.findOneAndDelete({ _id })
        
        return new Response(JSON.stringify(res), {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 