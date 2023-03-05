import mongoose from "mongoose";
import { type } from "os";

const {model, Schema} = mongoose;

export enum CATEGORIES {
    RESTAURANTE = "restaurante",
    MONUMENTO = "monumento",
    TIENDA = "tienda",
    BAR = "bar",
    PAISAJE = "paisaje"

}

const MarkerSchema = new Schema(
    {
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
        }
    }
    
    
);

export const markerModel = model("Marker", MarkerSchema);

