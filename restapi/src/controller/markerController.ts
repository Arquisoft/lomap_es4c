import {
  getMarkerServices,
  getMarkersServices,
  deleteMarkerServices,
  updateMarkerServices,
  createMarkerServices,
} from "../services/markerService";

import { Request, Response } from "express";
import MapMarker, { IMarker } from "../models/marker";
import { ObjectId } from "mongodb";

export async function getMarkersController(req: Request, res: Response) {
  try {
    const { webId } = req.params;
    const marker = await getMarkersServices(webId);
    console.log(marker);
    res.json(marker);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function getMarkerController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const marker = await getMarkerServices(new ObjectId(id));
    console.log(marker);
    res.json(marker);
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
}

export async function createMarkerController(req: Request, res: Response) {
    try {
      const { webId, latitud, longitud, titulo} = req.body.marker;
      const newMarker: IMarker = new MapMarker({ webId, latitud, longitud, titulo});
      await createMarkerServices(newMarker);
      res.json(newMarker);
    } catch (error) {
      res.status(500).json({ status: 500, message: error.message });
    }
}

export async function updateMarkerController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const marker = await updateMarkerServices(new ObjectId(id), req.body);
        console.log(marker);
        res.json(marker);
    } catch (error) {  
        res.status(500).json({ status: 500, message: error.message });
    }
}

export async function deleteMarkerController(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const marker = await deleteMarkerServices(new ObjectId(id));
        console.log(marker);
        res.json(marker);
    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    }
}
