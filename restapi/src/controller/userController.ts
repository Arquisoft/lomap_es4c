import crypto from 'crypto';
import { Request, Response } from "express";
import User, { IUser } from "../models/user";
import { ObjectId } from "mongodb";
import { check, validationResult } from 'express-validator';

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
   
    const { webId } = req.params;
    const user = await getUserServices(webId);
    console.log(User);
    if (!user) {
      res.status(404).send(`No se ha encontrado al usuario con id: ${req.params.id}`);
    } else {
      res.json(user);
    }
   
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function createUserController(req: Request, res: Response) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });//422 entidad no procesable
    }
  try {
    const { webId,nombre, apellidos, email, foto } = req.body;
    const newUser: IUser = new User({webId, nombre, apellidos, email, foto });
    await createUserServices(newUser);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const User = await updateUserServices(id, req.body);
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