import { connectToDb } from "@/lib/utils";
import { Students } from "@/lib/students";

export const GET = async (request, { params }) => {
        const arr = params.regNo.split('');
        arr.splice(3, 0, "/");
        arr.splice(8, 0, "/");
        const str = arr.join('');
    try {
        connectToDb();
        const res = await Students.findOne({regNo : str});
        console.log(res);
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 