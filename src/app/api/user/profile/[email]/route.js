import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

export const POST = async (req, {params}) => {
    const email = params.email;
    const {
        firstname,
        othernames,
        section,
        contact,
        LGA,
        state,
        nationality,
        address
    } = await req.json();

    console.log('Your Values are : ', email, '', firstname, '', othernames, '', section, '', contact, '', LGA, '', state, '', nationality, '', address,  )

    try{
        connectToDb();
        const doc = await User.findOne({email});
        if(doc){
            doc.firstname = firstname;
            doc.othernames = othernames;
            doc.section = section;
            doc.contact = contact;
            doc.LGA = LGA;
            doc.state = state;
            doc.nationality = nationality;
            doc.address = address;
            await doc.save();
            return new Response(JSON.stringify(doc), {status : 200});
        }else{
            return new Response('Failed to Update user details.', {status : 401});
        }
    }catch(err){
        console.log(err);
    }
}