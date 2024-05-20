import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.url.split("/").pop();

  try {
    await connectToDB();

    const todos = await Todo.find({ creator: userId });

    return new Response(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
