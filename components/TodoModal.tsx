"use client";

import { createTodo, updateTodo } from "@/hooks/useTodo";
import { useTodoContext } from "@/hooks/useTodoContext";
import { Todo, User } from "@/type";
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

const TodoModal = ({
  isModalOpen,
  closeModal,
  type,
  todo,
}: {
  isModalOpen: boolean;
  closeModal: () => void;
  type: "Create" | "Edit";
  todo?: Todo;
}) => {
  const [description, setDescription] = useState(todo?.description || "");

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user as User;

  const { dispatch } = useTodoContext();

  useEffect(() => {
    setDescription(todo?.description || "");
  }, [todo]);

  async function handleCreate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const { response, json } = await createTodo(description, false, user);

    if (response.ok) {
      dispatch({ type: "CREATE_TODO", payload: json });
    }

    closeModal();
    router.push("/");
  }

  async function handleEdit(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const { response, json } = await updateTodo(todo!, description, todo?.doneState);

    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json });
    }

    closeModal();
  }

  return (
    <Transition as={Fragment} appear show={isModalOpen}>
      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 flex w-screen justify-center p-4 h-fit mt-16">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-0"
            enterTo="opacity-100 scale-95"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-95"
            leaveTo="opacity-0 scale-0"
          >
            <DialogPanel className="max-w-lg space-y-4 bg-white p-6 rounded-lg">
              <DialogTitle className="font-bold text-xl">{type} Todo</DialogTitle>

              <input
                type="text"
                className="form_input text-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Your todo description..."
              />

              <div className="flex gap-4 justify-end">
                <button className="red_btn" onClick={closeModal}>
                  Cancel
                </button>
                <button
                  className="blue_btn"
                  onClick={(e) => {
                    type === "Create" ? handleCreate(e) : handleEdit(e);
                  }}
                >
                  {type}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TodoModal;
