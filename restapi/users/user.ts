import mongoose from "mongoose";

const {model, Schema} = mongoose;

const UserSchema = new Schema(
    {
        id: {
            type: String,
        },
        nombre: {
            type: String,
        },
        apellidos: {
            type: String,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
        },
        foto: {
            type: String,
        }
    }
    
    
);

export const userModel = model("User", UserSchema);

