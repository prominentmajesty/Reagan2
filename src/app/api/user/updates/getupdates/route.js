import { connectToDb } from "@/lib/utils";
import { Updates } from "@/lib/updates";

export const GET = async (request, { params }) => {
      
    try {
        connectToDb()

        const res = await Updates.find();
        
        return new Response(JSON.stringify(res), {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 