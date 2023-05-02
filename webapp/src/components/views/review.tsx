import React, { useState,useRef ,useEffect} from "react";
import {createPortal, render, unmountComponentAtNode} from 'react-dom';
import { updateMarkerReviews, getMarkersReview } from "../marker";
import "./review.css";
import StarRating from "./stars";
import { useSession } from "@inrupt/solid-ui-react";
import { useNavigate } from 'react-router-dom';


import { Session } from '@inrupt/solid-client-authn-browser';

type ReviewProps = {
  pName: string;
  pMarkId: string;
};

export async function getReview(session: Session, pMarkId: string, pName: string) {
  let webId = session.info.webId as String;
  let punto = await getMarkersReview(session, webId, pMarkId);
  if (punto !== undefined) {

    let id = punto[0];
    let nombre = punto[1];
    let reviewbody = punto[2];
    let puntuacion = Number.parseFloat(punto[3]);
    let imagen = punto[4];


    const imgElement = new Image();
    imgElement.src = imagen;
    var n = nombre.replace("https://", "");
    var n2 = n.substring(0, n.length-1);
    (document.getElementById("comment-name") as HTMLInputElement).innerHTML = n2;
    (document.getElementById("comment-text") as HTMLInputElement).innerHTML = reviewbody;
    //(document.getElementById("comment-id") as HTMLInputElement).value = id;
    (document.getElementById("imagen") as HTMLInputElement).setAttribute('src', imagen);
    (document.getElementById("rating") as HTMLInputElement).innerHTML = "";
    for(var i = 0; i < 5; i++){
     
      var star = document.createElement("span");
      if(i < puntuacion){
        star.innerHTML = "★";
      }
      else{
        star.innerHTML = "☆";
      }
      (document.getElementById("rating") as HTMLInputElement).appendChild(star);
    }
    //(document.getElementById("rating") as HTMLInputElement).innerHTML = puntuacion.toString();


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
    var marker = {
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
          <label id="lComentario">Comentario:</label>
            <textarea id="comentario" name="comentario" ></textarea>

            <label id="lAgregar">Agregar foto:</label>
            <input type="file" name="foto" id="foto" ></input>

            <label>Puntuación:</label>

            <div  id = "estrellas_ivan-div">
              <StarRating />
            </div>
            <input type="submit" value="Enviar"></input>
          </form>
        </div>
        <h2>Valoraciones:</h2>

        <div id="comment">
          <div id="comment-header">
            <h3 id="comment-name">Ejemplo(Nombre usuario)</h3>

          </div>
          <div id="comment-body">
            <p><img id="imagen" src="image.png" alt="Text to display when image can not be displayed" /></p>
            <p id="comment-text">Ejemplo comentario</p>
            <div id="comment-rating">
              <p id="comment-rating-text">Valoración:</p>
              <div id="rating">
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
