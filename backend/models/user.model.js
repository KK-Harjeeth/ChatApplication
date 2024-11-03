import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true, lowercase: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },
  },
  { timestamps: true } // createdAt , updatedAt
);


// This line creates a Mongoose model named User based on the userSchema. 
// The model provides an interface for interacting with the User collection in the MongoDB database.
const User = mongoose.model("User",userSchema);

export default User;