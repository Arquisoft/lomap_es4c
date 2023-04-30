import React, { useState,useRef ,useEffect} from "react";
import {createPortal, render, unmountComponentAtNode} from 'react-dom';
import { updateMarkerReviews, getMarkersReview } from "../marker";
import "./review.css";
import StarRating from "./stars";
import { MapMarkerReview } from '../../shared/shareddtypes';
import { useSession } from "@inrupt/solid-ui-react";
import { useNavigate, Navigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import StarRatings from 'react-star-ratings';


import { Session } from '@inrupt/solid-client-authn-browser';

type ReviewProps = {
  pName: string;
  pMarkId: string;
};

export async function getReview(session: Session, pMarkId: string, pName: string) {
  let punto = await getMarkersReview(session, pMarkId, pName);
  if (punto !== undefined) {

    let id = punto[0];
    let nombre = punto[1];
    let reviewbody = punto[2];
    let puntuacion = Number.parseFloat(punto[3]);
    let imagen = punto[4];


    const imgElement = new Image();
    imgElement.src = imagen;
    (document.getElementById("comment-name") as HTMLInputElement).value = nombre;
    (document.getElementById("comment-text") as HTMLInputElement).value = reviewbody;
    (document.getElementById("comment-name") as HTMLInputElement).value = id;
    (document.getElementById("imagen") as HTMLInputElement).value = imagen;


  }
}


function getImageDataUrl(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}



function Review(props: ReviewProps): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();

 



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/map');
    console.log("submit");
    console.log("imagen: " + (document.getElementById("foto") as HTMLInputElement).files);
    var imageDataUrl = "";
    var rating = 0;
    if ((document.getElementById("estrellas_ivan") as HTMLInputElement) != null) {
      console.log((document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected").length);
      rating = (document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected").length;
    }

    const imageFile = (document.getElementById("foto") as HTMLInputElement).files?.item(0);
    if (imageFile && imageFile.type.startsWith('image/')) {

      console.log("****imageFile****: " + imageFile);
      imageDataUrl = await getImageDataUrl(imageFile);

      console.log("****IMAGEN****: " + imageDataUrl);
    }
    console.log("rating: " + rating);
    var marker: MapMarkerReview = {
      webId: session.info.webId as string,
      id: props.pMarkId,
      comentario: (document.getElementById("comentario") as HTMLInputElement).value as string,
      puntuacion: rating,
      imagen: imageDataUrl
    };


    console.log("id: " + props.pMarkId);
    console.log("name:" + props.pName);

    let punto = await updateMarkerReviews(session, marker.webId, props.pMarkId, marker.comentario, marker.puntuacion, marker.imagen, props.pName);
    //navigate('/map');
    (document.getElementById("window-notice") as HTMLInputElement).style.visibility = "hidden";
    (document.getElementById("foto") as HTMLInputElement).value = "";
    (document.getElementById("comentario") as HTMLInputElement).value = "";
    for (let element in (document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected")) {
      (document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected").item(0)?.remove();
      (document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("noSelected").item(0)?.remove();
      
      //const node = myNode.containerInfo;
      //(document.getElementById("estrellas_ivan-div") as HTMLElement).appendChild(myNode);



    }
    unmountComponentAtNode(document.getElementById("estrellas_ivan-div") as HTMLElement);
    render(<StarRating />, document.getElementById("estrellas_ivan-div"));
    (document.getElementById("window-notice") as HTMLInputElement).style.visibility = "hidden";

  }


  return (
    <>
      <div>
        <h1>Añade una valoración</h1>
        <div>
          <form id="formReview" onSubmit={handleSubmit}>
            <label>Comentario:</label>
            <textarea id="comentario" name="comentario" ></textarea>

            <label>Agregar foto:</label>
            <input type="file" name="foto" id="foto" ></input>

            <label>Puntuación:</label>

            <StarRating />
            <input type="submit" value="Enviar"></input>
          </form>
        </div>
        <h2>Valoraciones de otros usuarios:</h2>

        <div className="comment">
          <div className="comment-header">
            <h3 className="comment-name">Ejemplo(Nombre usuario)</h3>

          </div>
          <div className="comment-body">
            <p><img id="imagen" src="image.png" alt="Text to display when image can not be displayed" />Aqui irian fotos</p>
            <p id="comment-text">Ejemplo comentario</p>
            <div id="comment-rating">
              <p className="comment-rating-text">Valoración:</p>
              <div className="rating">
                <span className="selected">★</span>
                <span className="selected">★</span>
                <span className="selected">★</span>
                <span className="unselected-star">★</span>
                <span className="unselected-star">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
