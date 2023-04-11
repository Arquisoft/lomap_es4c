export type User = {
  name: string;
  email: string;
}

export type MapMarker = {
  webId: string;
  id:string;
  titulo: string;
  descripcion: string;
  latitud: Number;
  longitud: Number;
  categoria: string;
  comentario: string;
  puntuacion: Number;
  imagen: string;
}
export type MapMarkerReview = {
  webId: string;
  id:string;
  descripcion: string;
  categoria: string;
  comentario: string;
  puntuacion: Number;
  imagen: string;
}



