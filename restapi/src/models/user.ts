import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  WebId: String;
  nombre: String;
  apellidos: String;
  email: String;
  foto: String;
}
const UserSchema = new Schema({
  WebId: {
    type: String,
    unique: true,
  },
  nombre: {
    type: String,
  },
  apellidos: {
    type: String,
  },
  email: {
    type: String,

    lowercase: true,
  },
  foto: {
    type: String,
  },
});

export default model<IUser>("User", UserSchema);
