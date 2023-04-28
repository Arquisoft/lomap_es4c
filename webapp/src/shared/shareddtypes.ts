export type User = {
  name: string;
  email: string;
}
export type Maps = {
  maps:MapMarker[]

}
export type MapMarker = {
  id: string;
  name:string;
  author: string;
  locations:Location[];

}
export type Location = {
  id: string;
  name:string;
  category: string;
  latitude: number;
  longitude: number;
  description: string;
  comments:Comment[];
  reviewScores:ReviewScore[];
  pictures:Picture[];

}

export type Comment = {
  author: string;
  comment:string;
  date: string;
}
export type ReviewScore = {
  author: string;
  score:Number;
  date: number;

}
export type Picture = {
  author: string;
  pictureUrl:string;
  date: number;

}
export type MapMarkerReview = {
  webId: string;
  id:string;
  comentario: string;
  puntuacion: Number;
  imagen: Blob;
}



