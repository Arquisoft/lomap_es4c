import express, { Request, Response, Router } from 'express';
import {check} from 'express-validator';

import {addUser, loginUser} from './src/controllers/UserController'

const api:Router = express.Router()

interface User {
    name: string;
    email: string;
}

//This is not a restapi as it mantains state but it is here for
//simplicity. A database should be used instead.
let users: Array<User> = [];

api.get(
    "/users/list",
    async (req: Request, res: Response): Promise<Response> => {
        return res.status(200).send(users);
    }
);

api.post("/users/add",addUser);

api.post("/users/login", loginUser);

export default api;