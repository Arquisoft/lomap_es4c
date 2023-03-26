import express, { Application, RequestHandler } from "express";
import cors from 'cors';
import bp from 'body-parser';
import morgan from "morgan";
import promBundle from 'express-prom-bundle';
//import api from "./api"; 
import routes from "./src/routes/index";
import userRoutes from "./src/routes/userRoutes";
import log4js from 'log4js';

const mongoose = require('mongoose');

const usuario = encodeURIComponent("lomap4c");
const password = encodeURIComponent("Arquisoft?");
const dbName = encodeURIComponent("lomap4c");

const uri =`mongodb+srv://lomap4c:lomap4c@lomap4c.bjvsr6h.mongodb.net/?retryWrites=true&w=majority`;
const rest = require('request');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('conectado a mongodb')) 
  .catch((e: any) => console.log('error de conexión', e))

const app: Application = express();
const port: number = 5000;
const metricsMiddleware:RequestHandler = promBundle({includeMethod: true});
app.use(metricsMiddleware);
app.use(express.static('public'));
app.use(morgan("dev"));
app.use(cors());
app.use(bp.json());
//app.use("/api", api)
app.set('rest',rest);
app.use(routes);
app.use("/api/user", userRoutes);

app.listen(port, ():void => {
    console.log('Restapi listening on '+ port);
}).on("error",(error:Error)=>{
    console.error('Error occured: ' + error.message);
    
});

log4js.configure({
    appenders: {LoMap4c: {type: "file", filename: "LoMap4c.log"}},
    categories: {default: {appenders: ["LoMap4c"], level: "trace"}}
});

const logger = log4js.getLogger("MyWallapop");
app.set('logger', logger);



