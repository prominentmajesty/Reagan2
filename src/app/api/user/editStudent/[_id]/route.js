import { connectToDb } from "@/lib/utils";
import { Students } from "@/lib/students";

export const POST = async(req, {params}) => {
    
    console.log('Your ID is : ', params._id);
    const {
        firstname,
        othernames,
        age,
        gender,
        classAdmited,
        section,
        parentphone
    } = await req.json();

    try{

        const doc = await Students.findById(params._id);

        doc.firstname = firstname;
        doc.othernames = othernames;
        doc.age = age;
        doc.gender = gender;
        doc.classAdmited = classAdmited;
        doc.section = section;
        doc.parentphone = parentphone;

        const res = await doc.save();
        return new Response(JSON.stringify(res), {status : 200});

    }catch(err){
        console.log(err)
        return new Response('Failed due to server issue..')
    }

}

export const DELETE = async(req, {params}) => {

    try{

        const res = await Students.findByIdAndDelete(params._id);
        
        return new Response(JSON.stringify(res), {status : 200});
    
    }catch(err){
        console.log(err);
        return new Response('Failed to delete student information..', {status : 500});
    }
}
