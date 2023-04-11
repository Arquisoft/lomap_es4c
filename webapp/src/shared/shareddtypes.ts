export type User = {
  name: string;
  email: string;
}

export type MapMarker = {
  webId: string;
  id:string;
  titulo: string;
  latitud: Number;
  longitud: Number;
  categoria: string;
  
}
export type MapMarkerReview = {
  webId: string;
  id:string;
  descripcion: string;
  comentario: string;
  puntuacion: Number;
  imagen: string;
}



