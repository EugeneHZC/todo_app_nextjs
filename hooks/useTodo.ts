import { Todo, User } from "@/type";

async function getTodos(user?: User) {
  const response = await fetch(`/api/todos/${user?.id}`);
  const json = await response.json();

  return { response, json };
}

async function updateTodo(todo: Todo, description?: string, doneState?: boolean) {
  const response = await fetch(`/api/todos/update/${todo._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, doneState }),
  });

  const json = await response.json();

  return { response, json };
}

async function createTodo(description?: string, doneState?: boolean, user?: User) {
  const response = await fetch("/api/todos/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ description, doneState, creator: user?.id }),
  });

  const json = await response.json();

  return { response, json };
}

async function deleteTodo(todo: Todo) {
  const response = await fetch(`/api/todos/delete/${todo._id}`, { method: "DELETE" });
  const json = await response.json();

  return { response, json };
}

export { getTodos, createTodo, updateTodo, deleteTodo };
