import { connectToDb } from "@/lib/utils";
import { Results } from "@/lib/results";

//For Searching Student Result
export const GET = async (request, { params }) => {
    const arr = params.regNo.split('');
    arr.splice(3, 0, "/");
    arr.splice(8, 0, "/");
    const str = arr.join('');
    console.log(str);
    try {
        connectToDb();
        const res = await Results.findOne({regNo : str});
        console.log(res);
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch stuents", { status: 500 })
    }
} 