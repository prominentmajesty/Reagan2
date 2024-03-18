import { connectToDb } from "@/lib/utils";
import { Results } from "@/lib/results";

export const POST = async(request, {params}) => {
    const req = await request.json();
    const section = req.obj.details.section;
    const elementry = req.obj.details.elementry;
    const term = req.obj.details.term;
    const assesment = req.obj.details.assesment;
    const arr = req.obj.scores;

    const data = {}
    data.firstname = req.obj.details.firstname;
    data.othernames = req.obj.details.othernames;
    data.regNo = req.obj.details.regNo;
    data.date = req.obj.details.date;

    data[section] = {};
    data[section].section = section;

    data[section].studentClass = {};
    data[section].studentClass[elementry] = {};
    data[section].studentClass[elementry].class = elementry;
    data[section].studentClass[elementry][term] = {};
    data[section].studentClass[elementry][term].term = term;
    data[section].studentClass[elementry][term][assesment] = arr;

    console.log(JSON.stringify(data, null, 2));

    try{

        connectToDb();

        const res = await Results.findOne({regNo : req.obj.details.regNo});

        // if (res){
        //     await Results.findOneAndUpdate({regNo : req.obj.details.regNo}, {$set : data});
        //     return new Response('This went well', { status: 200 })
        // }
        console.log('Operation failed, Could not find student with such Registration Number..')
        return new Response('Operation failed..', { status: 500 })
        
    }catch(err){
        console.log(err);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

//https://stackoverflow.com/questions/73913797/how-to-update-a-document-with-dynamic-variable-and-nested-objects-in-mongodb