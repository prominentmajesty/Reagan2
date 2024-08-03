import { connectToDb } from "@/lib/utils";
import { Parents } from "@/lib/parents";

export const GET = async (request, {params}) => {
    const phone = params.id;
    try {
            const res = await Parents.findOne({phone});
            return new Response(JSON.stringify(res), {status : 200});
    }catch(err){
        console.log(err);
        return new Response(err, {status : 501});
    }
}

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