import Todo from "@/models/todo";
import { connectToDB } from "@/utils/database";
import { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  const id = request.url.split("/").pop();
  const { description, doneState } = await request.json();

  try {
    await connectToDB();

    const todo = await Todo.findByIdAndUpdate({ _id: id }, { description, doneState }, { new: true });
    if (!todo) return new Response(JSON.stringify("No todo found."), { status: 404 });

    return new Response(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to update todo."), { status: 500 });
  }
}
