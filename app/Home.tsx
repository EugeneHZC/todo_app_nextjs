"use client";
import TodoList from "@/components/TodoList";
import { getTodos } from "@/hooks/useTodo";
import { useTodoContext } from "@/hooks/useTodoContext";
import { BuiltInProviderType } from "next-auth/providers";
import { useSession, getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user as { id: string };
  const router = useRouter();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const { todos } = useTodoContext();

  useEffect(() => {
    async function setupProviders() {
      const response = await getProviders();

      setProviders(response);
    }

    setupProviders();
    if (user) getTodos(session?.user as { id: string });

    if (session?.user) router.push("/");
  }, [router, session]);

  return (
    <div className="w-full">
      {session?.user && (
        <div>
          <h1 className="head_text">Todo List</h1>

          <TodoList todos={todos} handleDelete={deleteTodo} handleUpdate={updateTodo} handleCreate={createTodo} />
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
