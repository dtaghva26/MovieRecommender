import { Schema, model } from "mongoose";
import Counter from "./Counter.js";

const userSchema = new Schema(
  {
    userId: { type: Number, unique: true, index: true },

    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
    password: { type: String, required: true },

    isActive: { type: Boolean, default: true },
    age: { type: Number, default: 18 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.userId != null) return; // already set

  const counter = await Counter.findOneAndUpdate(
    { _id: "userId" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  this.userId = counter.seq;
});


let User = model("User", userSchema)
export default User;
