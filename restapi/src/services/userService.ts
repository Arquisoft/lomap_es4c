
import User, { IUser } from "../models/user";
import { ObjectId } from "mongodb";

export async function getUsersServices() {
  try {
    return await User.find();
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function getUserServices(id: String) {
  try {
    return await User.findOne({ _id: id });
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function createUserServices(user: IUser) {
  try {
    await user.save();
    return user;
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function updateUserServices(id: String, user: IUser) {
    try {
      await User.findOneAndUpdate({ _id: id}, User);
      return user;
    } catch (error) {
      // Log Errors
      throw Error(error);
    }
  }

  export async function deleteUserServices(id: ObjectId) {
    try {
      return await User.findOneAndRemove({_id: id});
    } catch (error) {
      // Log Errors
      throw Error(error);
    }
  }