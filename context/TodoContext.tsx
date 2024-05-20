"use client";

import { Todo } from "@/type";
import { Dispatch, ReactNode, createContext, useState } from "react";

interface TodoState {
  todos: Todo[];
}

interface SetTodosAction {
  type: "SET_TODOS";
  payload: Todo[];
}

interface CreateTodoAction {
  type: "CREATE_TODO";
  payload: Todo;
}

interface UpdateTodoAction {
  type: "UPDATE_TODO";
  payload: Todo;
}

interface DeleteTodoAction {
  type: "DELETE_TODO";
  payload: Todo;
}

type Action = SetTodosAction | CreateTodoAction | UpdateTodoAction | DeleteTodoAction;

interface TodoContextState extends TodoState {
  dispatch: Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextState | null>(null);

const TodoContextProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  function dispatch(action: Action) {
    switch (action.type) {
      case "SET_TODOS":
        setTodos(action.payload);
        break;
      case "CREATE_TODO":
        setTodos([...todos, action.payload]);
        break;
      case "DELETE_TODO":
        setTodos((prevTodos) =>
          prevTodos ? prevTodos?.filter((prevTodo) => prevTodo._id !== action.payload._id) : prevTodos
        );
        break;
      case "UPDATE_TODO":
        setTodos((prevTodos) =>
          prevTodos
            ? prevTodos.map((prevTodo) => (prevTodo._id === action.payload._id ? action.payload : prevTodo))
            : []
        );
        break;
      default:
        break;
    }
  }

  return <TodoContext.Provider value={{ todos, dispatch }}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
