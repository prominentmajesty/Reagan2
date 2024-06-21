import { connectToDb } from "@/lib/utils";
import { Parents } from "@/lib/parents";

export const PATCH = async (request, {params}) => {
    try {

        const {
            firstname,
            othernames,
            address,
            phone,
            gender,
            LGA,
            city,
            nationality
        } = await request.json();

            const res = await Parents.findOneAndUpdate({_id : params.id}, {$set: {firstname, othernames, address, phone, gender, phone, LGA, city, nationality}}, {new : true});
            console.log(JSON.stringify(res));
            return new Response(JSON.stringify(res), {status : 200});

    }catch(err){
        console.log(err);
    }
}

export const DELETE = async (request, {params}) => {
    try {

        const res = await Parents.findOneAndDelete({_id : params.id});
        return new Response(JSON.stringify(res), {status : 200});

    }catch(err){
        console.log(err);
    }
}