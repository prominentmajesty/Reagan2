import { connectToDb } from "@/lib/utils";
import { Updates } from "@/lib/updates";

export const POST = async (request, { params }) => {
    // const {  } = await request.json();
      

    try {
        connectToDb()
        
        return new Response('Update Successfully Uploaded Successfully..', {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 