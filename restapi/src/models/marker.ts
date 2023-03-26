import { model, Schema, Document } from "mongoose";
import { type } from "os";

export enum CATEGORIES {
  RESTAURANTE = "restaurante",
  MONUMENTO = "monumento",
  TIENDA = "tienda",
  BAR = "bar",
  PAISAJE = "paisaje",
}

export interface IMarker extends Document {
  id: String;
  titulo: String;
  descripcion: String;
  latitud: String;
  longitud: String;
  categoria: CATEGORIES;
  comentario: String;
  puntuacion: Number;
  imagen: String;
}

const MarkerSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  titulo: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  latitud: {
    type: String,
  },
  longitud: {
    type: String,
  },
  categoria: {
    type: CATEGORIES,
  },
  comentario: {
    type: String,
  },
  puntuacion: {
    type: Number,
  },
  imagen: {
    type: String,
  },
});

export default model<IMarker>("Marker", MarkerSchema);
