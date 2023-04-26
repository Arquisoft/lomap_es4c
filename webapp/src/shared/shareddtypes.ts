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

}
export type MapMarkerReview = {
  webId: string;
  id:string;
  comentario: string;
  puntuacion: Number;
  imagen: Blob;
}



