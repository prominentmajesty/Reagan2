import { connectToDb } from "@/lib/utils";
import { Parents } from "@/lib/parents";

export const POST = async (request, { params }) => {
    try {
       
        const {
            firstname,
            othernames,
            address,
            phone,
            gender,
            LGA,
            city,
            nationality,
        } = await request.json();

        console.log(firstname, "", othernames, "", address, "", phone, "", gender, "", LGA, "", city, "", nationality)

        connectToDb();
        const res = await Parents.findOne({phone});
        console.log(res);
        if(res){
            return new Response('Parent already Exist', {status : 501});
        }

        const doc = new Parents({
            firstname,
            othernames,
            address,
            phone,
            gender,
            LGA,
            city,
            nationality
        });

        const parent = await doc.save();
        return new Response(JSON.stringify(parent), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch stuents", { status: 500 })
    }
} 

export const GET = async (request, {params}) => {
    try{
        const res = await Parents.find();
        return new Response(JSON.stringify(res), {status : 200});
    }catch(err){
        console.log(err);
    }
}

export const PUT = async (request, {params}) => {

    try { 

        const {phone} = await request.json();

        const res = await Parents.findOne({phone});

        if(res){

            return new Response(JSON.stringify(res), {status : 200});
        }
        
        return new Response('User does not exist..', {status : 200})

    }catch(err){
        console.log(err);
    }
}