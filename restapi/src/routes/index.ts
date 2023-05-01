import { Router } from "express";
import * as MarkerController from "../controller/markerController";

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", (req, res) =>
      res.send("ApiRest Typescript, Node js and MongoDB")
    );
    this.router.get("/markers", (req, res) =>
      MarkerController.getMarkersController(req, res)
    );
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
