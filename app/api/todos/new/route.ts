import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { description, doneState, creator } = await request.json();

  try {
    await connectToDB();

    const todo = await Todo.create({ description, doneState, creator });

    return new Response(JSON.stringify(todo), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
