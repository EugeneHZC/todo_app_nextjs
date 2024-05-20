import Todo from "@/models/todo";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.url.split("/").pop();

  try {
    const todo = await Todo.findByIdAndDelete({ _id: id });

    if (!todo) return new Response(JSON.stringify("No todo found."), { status: 404 });

    return new Response(JSON.stringify(todo), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify("Failed to delete."), { status: 500 });
  }
}
