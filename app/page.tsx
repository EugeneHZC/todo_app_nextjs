"use client";

import TodoList from "@/components/TodoList";
import { deleteTodo, getTodos } from "@/hooks/useTodo";
import { useTodoContext } from "@/hooks/useTodoContext";
import { User } from "@/type/index";
import { BuiltInProviderType } from "next-auth/providers";
import { useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user as User;
  const router = useRouter();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const { todos, dispatch } = useTodoContext();

  async function fetchTodos() {
    if (user) {
      const { response, json } = await getTodos(user!);

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    }
  }

  function handleDeleteDoneTodos(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    todos.map(async (todo) => {
      if (todo.doneState === true) {
        const { response, json } = await deleteTodo(todo);

        if (response.ok) {
          todo.doneState ? dispatch({ type: "DELETE_TODO", payload: json }) : todo;
        }
      }
    });
  }

  useEffect(() => {
    async function setupProviders() {
      const response = await getProviders();

      setProviders(response);
    }

    setupProviders();

    if (user) {
      fetchTodos();
      router.push("/");
    }
  }, [router, session]);

  return (
    <div className="w-full">
      {session?.user && (
        <div>
          <div className="flex items-center mt-10 justify-between">
            <h1 className="head_text">Todo List</h1>
            <button
              className="text-xl bg-blue-700 text-white rounded-md p-5 hover:bg-blue-900 transition-all duration-200"
              onClick={handleDeleteDoneTodos}
            >
              Delete Done Todos
            </button>
          </div>

          <TodoList todos={todos} />
        </div>
      )}

      {!session?.user && (
        <div className="flex gap-16 w-full mt-10 justify-between items-center">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="head_text">Manage Your Todos</h1>
              <p className="desc">Create and manage your todos here.</p>
            </div>
            <div>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button className="black_btn" onClick={() => signIn(provider.id)} key={provider.id}>
                    Try for free
                  </button>
                ))}
            </div>
          </div>

          <div>
            <Image src="/to-do-list.png" alt="todo list image" width={400} height={400} />
          </div>
        </div>
      )}
    </div>
  );
}
