import mongoose from "mongoose";
let Schema = mongoose.Schema;

const usersSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already registered"],
  },
  firstName: String,
  lastName: String,
  password: String,
  source: {
    type: String,
    enum: ["Google", "Email"],
    required: [true, "Source not specified"],
  },
  verified: Boolean,
  creationDate: { type: String, default: new Date().toISOString() },
});

var Users = mongoose.model("users", usersSchema, "users");
export default Users;
