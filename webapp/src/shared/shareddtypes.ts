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

export type review={

    
      "@type": "Review",
      "author": {
        "@type": "Person",
        "identifier": "?WebId"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "?ReviewValue"
      },
      "datePublished": "?ReviewDate", 
      "reviewBody": "?ReviewComment"
    
}

export type Place={

  
    "@type": "Place",
    "identifier": "?UUID",
    "name": "?MarkerName",
    "author": {
      "@type": "Person",
      "identifier": "?WebId"
    },
    "additionalType": "?MarkerCategory",
    "latitude": "?MarkerLatitude",
    "longitude": "?MarkerLongitude",
    "description": "?MarkerDescription",

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



