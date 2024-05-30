import { connectToDb } from "@/lib/utils";
import { User } from "@/lib/models";

export const GET = async (request, { params }) => {
    console.log(params);
    try {
        connectToDb();
        const res = await User.find({ email: params.email });
        console.log(res)
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new new Response("Failed to fetch data", { status: 500 })
    }
} 

export const PATCH = async(request, {params}) => {
    const { isTeacher } = await request.json();

    try{

        connectToDb();
        const res =  await User.findOneAndUpdate({email : params.email}, {$set : {isTeacher}}, {new : true})
        return new Response(JSON.stringify(res), { status: 200 })
    }catch(err){
        console.log(err);
    }
}

export const PUT = async(request, {params}) => {
    const { isAdmin } = await request.json();
    try{

        connectToDb();
        const res =  await User.findOneAndUpdate({email : params.email}, {$set : {isAdmin}}, {new : true})
        return new Response(JSON.stringify(res), { status: 200 })
    }catch(err){
        console.log(err);
    }
}

export const DELETE = async(request, {params}) => {
    const { email } = await request.json();
    console.log(email);
    try{

        connectToDb();
        const res =  await User.findOneAndDelete({email : params.email})
        return new Response(JSON.stringify(res), { status: 200 })
    }catch(err){
        console.log(err);
    }
}