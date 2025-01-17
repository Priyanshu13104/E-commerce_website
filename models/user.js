import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {type: String, default: 'user'} 
})

export const User = mongoose.model('user', UserSchema)
