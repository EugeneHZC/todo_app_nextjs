"use client";

import { Todo } from "@/type";
import { useState } from "react";
import TodoModal from "./TodoModal";
import { deleteTodo, updateTodo } from "@/hooks/useTodo";
import { useTodoContext } from "@/hooks/useTodoContext";

const TodoCard = ({ todo }: { todo: Todo }) => {
  const [isChecked, setIsChecked] = useState(todo.doneState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useTodoContext();

  async function handleDoneStateChanged(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const newIsChecked = !isChecked;
    setIsChecked(newIsChecked);

    const { response, json } = await updateTodo(todo, todo.description, newIsChecked);
    if (response.ok) {
      dispatch({ type: "UPDATE_TODO", payload: json });
    }
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    const { response, json } = await deleteTodo(todo);

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  }

  return (
    <div className="p-5 flex flex-col gap-5 rounded-xl bg-gray-100 justify-between">
      <h4 className="font-satoshi break-words text-xl">{todo.description}</h4>

      <div className="flex gap-1 items-center">
        <input
          id={`done#${todo._id}`}
          type="checkbox"
          checked={isChecked}
          onChange={handleDoneStateChanged}
          className="cursor-pointer"
        />
        <label htmlFor={`done#${todo._id}`} className="cursor-pointer font-satoshi">
          Done
        </label>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button className="blue_btn" onClick={() => setIsModalOpen(true)}>
          Edit
        </button>
        <button className="red_btn" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {isModalOpen && (
        <TodoModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} type="Edit" todo={todo} />
      )}
    </div>
  );
};

export default TodoCard;
