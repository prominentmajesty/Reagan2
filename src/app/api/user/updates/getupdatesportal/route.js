import { Updates } from "@/lib/updates";

export const DELETE = async (req, {params}) => {
    try{
        const res = await Updates.find().where('category').equals('management');
        console.log('Your Updates are as follows..',res);
        return new Response(JSON.stringify(res), {status : 200});
    }catch(err){
        console.log(err);
        return new Response(err, {status : 401});
    }

}