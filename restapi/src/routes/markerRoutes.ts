import { Router } from "express";
import {
  getMarkerController,
  getMarkersController,
  createMarkerController,
  updateMarkerController,
  deleteMarkerController
} from "../controller/markerController";

class MapMarker {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/user/:webId", getMarkersController);
    this.router.get("/:id", getMarkerController);
    this.router.post("/add", createMarkerController);
    this.router.put('/:id', updateMarkerController);
    this.router.delete('/:id', deleteMarkerController);
  }
}

const marker = new MapMarker();
export default marker.router;