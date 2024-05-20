import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Please include a description for the todo."],
  },
  doneState: {
    type: Boolean,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;
