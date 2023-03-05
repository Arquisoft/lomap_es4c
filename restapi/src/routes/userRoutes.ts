import { Router } from "express";
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
    this.router.post("/add", createUserController);
    this.router.put('/:id', updateUserController);
    this.router.delete('/:id', deleteUserController);
  }
}

const user = new User();
export default user.router;