import { Router } from "express";
const { body } = require('express-validator');
import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController
} from "../controller/userController";

class User {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", getUsersController);
    this.router.get("/:id", getUserController);
    this.router.post("/add", [
    body('nombre').isLength({ min: 1 }),
    body('email').isEmail(),
    body('webId').isLength({ min: 10 })], createUserController);
    this.router.put('/:id', updateUserController);
    this.router.delete('/:id', deleteUserController);
  }
}

const user = new User();
export default user.router;