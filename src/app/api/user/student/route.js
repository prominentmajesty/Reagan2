import { connectToDb } from "@/lib/utils";
import { Students } from "@/lib/students";

export const POST = async (request, { params }) => {
    const { data } = await request.json();
    console.log(data.search)
    try {
        connectToDb();
        const res = await Students.findOne({regNo : data.search});
        console.log(res);
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 
