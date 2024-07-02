import { connectToDb } from "@/lib/utils";
import { Students } from "@/lib/students";
import { Results } from "@/lib/results";

export const POST = async (req, {params}) => {
  const { 
    firstname, 
    othernames,
    age,
    gender,
    classAdmited,
    section,
    parentphone,
  } = await req.json();

    const str = 'SRS'
    const random = Math.floor(Math.random() * (100000 - 100) ) + 5; //44348
    const year = new Date().getFullYear();
    let regNo;

    section === 'Primary' ? regNo = `${str}/PRI/${year}/${random}` : regNo = `${str}/SEC/${year}/${random}`
  
  try {
    connectToDb();
    
    const doc = new Students({
      regNo,
      firstname,
      othernames, 
      age,
      gender,
      classAdmited,
      section,
      parentphone
    });

    await doc.save();

    const result  = new Results({
      firstname,
      othernames, 
      regNo,
    })

    const res = await result.save();

    return new Response(JSON.stringify(res), {status : 200});
  } catch (e) {
    return new Response(e, {status : 500})
  }
}