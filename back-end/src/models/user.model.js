import mongoose from "mongoose";
import { ROLES } from "./constants.js";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: { type: String },
    dateOfBirth: { type: String },
    role: { type: String, default: ROLES.USER },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    methods: {
      getPublickProfile() {
        const { password, _id, __v, ...user } = this._doc;
        return { id: _id, ...user };
      },
      getPublickShortProfile() {
        const { firstName, lastName, _id } = this._doc;
        return { id: _id, firstName, lastName };
      },
      getPublickBigProfile() {
        const { firstName, lastName, _id, email, role, dateOfBirth } = this._doc;
        return { id: _id, firstName, lastName, dateOfBirth, email, role };
      },
      isAdmin() {
        return this.role === ROLES.ADMIN;
      },
      hasRole(role) {
        return this.role === role;
      },
    },
  }
);

export const Users = mongoose.model("Users", userSchema);
