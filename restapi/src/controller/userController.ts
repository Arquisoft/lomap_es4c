import crypto from 'crypto';
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { ObjectId } from "mongodb";

import {
  getUsersServices,
  getUserServices,
  createUserServices,
  updateUserServices,
  deleteUserServices
} from "../services/userService";

export async function getUsersController(req: Request, res: Response) {
  try {
    const User = await getUsersServices();
    console.log(User);
    res.json(User);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function getUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const User = await getUserServices(new ObjectId(id));
    console.log(User);
    res.json(User);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function createUserController(req: Request, res: Response) {
  try {
    const { nombre, apellidos, email,foto } = req.body;
    const newUser: IUser = new User({ nombre, apellidos, email,foto });
    await createUserServices(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function updateUserController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const User = await updateUserServices(new ObjectId(id), req.body);
      console.log(User);
      res.json(User);
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }

  export async function deleteUserController(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const User = await deleteUserServices(new ObjectId(id));
      console.log(User);
      res.json(User);
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }