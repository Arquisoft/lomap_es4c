import { Router } from "express";

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
  }
}

const routes = new Routes();
routes.routes();

export default routes.router;
