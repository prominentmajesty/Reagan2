import { connectToDb } from "@/lib/utils";
import { Updates } from "@/lib/updates";

export const POST = async (request, { params }) => {
    const { category, subject, updates, date } = await request.json();
    console.log();
    try {
        connectToDb();
        const res = await Updates.find();
        
        if(res){
            
            if(category === "management"){
                const doc = new Updates({
                    category : { managemment : category },
                    subject, 
                    updates,
                    date
                });
                await doc.save();
                return new Response('Success !! Post was successful..', { status: 200 });
            }
                const doc = new Updates({
                    category : { people : category},
                    subject, 
                    updates,
                    date
                });
                await doc.save();
                return new Response('Success !! Post was successful..', { status: 200 });
        }

            if(category === 'management'){
                await Updates.create({
                    category : {managemment : category},
                    subject,
                    updates,
                    date
                });
                return new Response('Success !! Post was successful..', {status : 200});
            }

            await Updates.create({
                category : {people : category},
                subject,
                updates,
                date
            });

            return new Response('Success !! Post was successful..', {status : 200});

    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 