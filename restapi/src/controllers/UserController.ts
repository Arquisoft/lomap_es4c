import  { Request, Response } from 'express';
const User = require("../models/User");
const crypto = require("crypto");

export const findusers = async (req: Request, res: Response) => {
    const users = await User.find({});
    res.setHeader('Content-Type', 'application/json');
    res.status(200);
    res.send(users);
}

export const addUser = async (req: Request, res: Response) => {
    let name = req.body.dni;
    let surname = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let password = await crypto.createHmac('sha256', "secret")
        .update(req.body.password).digest('hex');
    let role = 1;

    let errors = validatePassword(req.body.password, req.body.repeatPassword);
    if(errors.length != 0){
        res.status(401);
        res.send(errors)
    }
    else {
        let user = new User({
            name: name,
            surname: surname,
            email: email,
            username: username,
            password: password,
            role: role
        });
        await user.save();
        res.status(200);
        res.send(user);
    }
}

export const loginUser = async (req: Request, res: Response) => {
    let username = req.body.username;
    let password = await crypto.createHmac('sha256', "secret")
    .update(req.body.password).digest('hex');

    let query = {
        username: username,
        password: password
    };

    let user = await User.findOne(query);

    if(user == null){
        res.status(401);
        res.json({
            errors: "Email o contraseña incorrectos",
            autenticado: false
        });
    }
    else{
        req.session.usuario = username;
        req.session.role = user.role
        res.status(200);4
        res.send();
    }
}

function validatePassword(password: String, repeatPassword: String){
    let errors = new Array();
    if(repeatPassword != password){
        errors.push("Error: Las contraseñas no coinciden");
    }

    return errors;
}