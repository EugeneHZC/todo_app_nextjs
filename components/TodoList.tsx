import { Todo } from "@/type";
import TodoCard from "./TodoCard";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  return (
    <div className="grid grid-cols-3 gap-3 mt-10">
      {todos.map((todo) => (
        <TodoCard todo={todo} key={todo._id} />
      ))}
    </div>
  );
};

export default TodoList;
