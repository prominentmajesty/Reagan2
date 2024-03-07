import { connectToDb } from "@/lib/utils";
import { Students } from "@/lib/students";
import { revalidatePath } from "next/cache";

export const GET = async (request, { params }) => {
    try {
        connectToDb();
        const res = await Students.find();
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new new Response("Failed to fetch stuents", { status: 500 })
    }
} 