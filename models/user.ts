import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please include a username."],
  },
  email: {
    type: String,
    required: [true, "Please include an email."],
    unique: [true, "Email already in use."],
  },
  image: {
    type: String,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
