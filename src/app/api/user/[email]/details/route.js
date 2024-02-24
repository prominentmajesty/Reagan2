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
        return new new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 