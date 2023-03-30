import MapMarker, { IMarker } from "../models/marker";
import { ObjectId } from "mongodb";
import user from "../models/user";

export async function getMarkersServices(webId:String) {
  try {
    return await MapMarker.find();
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function getMarkerServices(id: ObjectId) {
  try {
    return await MapMarker.find({ _id: id });
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function createMarkerServices(marker: IMarker) {
  try {
    await marker.save();
    return marker;
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function updateMarkerServices(id: ObjectId, marker: IMarker) {
  try {
    await MapMarker.findOneAndUpdate({ _id: id }, marker);
    return marker;
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}

export async function deleteMarkerServices(id: ObjectId) {
  try {
    return await MapMarker.findOneAndDelete({ _id: id });
  } catch (error) {
    // Log Errors
    throw Error(error);
  }
}
