import { connectToDb } from "@/lib/utils";
import { Updates } from "@/lib/updates";

export const POST = async (request, { params }) => {  

    try {
        const { category, subject, updates, date } = await request.json();
        connectToDb();

        const doc = new Updates({
            category : category,
            subject : subject,
            updates : updates,
            date : date
        });

        await doc.save();
        
        return new Response('Update Successfully Uploaded Successfully..', {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 