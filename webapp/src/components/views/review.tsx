import React, { useState } from "react";
import { updateMarkerReviews } from "../marker";
import "./review.css";
import StarRating from "./stars";
import { MapMarkerReview } from '../../shared/shareddtypes';
import { useSession } from "@inrupt/solid-ui-react";
import { useNavigate, Navigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import StarRatings from 'react-star-ratings';

import { Session } from '@inrupt/solid-client-authn-browser';

type ReviewProps  ={
  pName: string;
  pMarkId: string;
};

function Review(props:ReviewProps):JSX.Element{
  const navigate = useNavigate();
  const { session } = useSession();
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/map');
    console.log("submit");
    console.log("imagen: " + (document.getElementById("foto") as HTMLInputElement).files);
    var blob = new Blob();
    const inputFile = document.querySelector('input[type="file"]') as HTMLInputElement; 
    if (inputFile.files && inputFile.files.length > 0) { 
      const file = inputFile.files[0]; 
      const reader = new FileReader();
       reader.addEventListener('load', () => { 
        blob = new Blob([reader.result as ArrayBuffer], { type: file.type });
        console.log("type: " + file.type);

         // Utiliza el objeto Blob como necesites 
        }); 
        reader.readAsArrayBuffer(file); 
        }

    var rating = 0;
    if((document.getElementById("estrellas_ivan") as HTMLInputElement) != null){
        console.log((document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected").length);
        rating = (document.getElementById("estrellas_ivan") as HTMLInputElement).getElementsByClassName("selected").length;
      }
    console.log("rating: " + rating);
    var marker: MapMarkerReview = {
      webId: session.info.webId as string,
      id:props.pMarkId,
      descripcion:"",
      comentario: (document.getElementById("comentario") as HTMLInputElement).value as string,
      puntuacion: rating,
      imagen: blob,

    };
    console.log("webid: " + marker.webId);
    console.log("id: " + props.pMarkId);
    console.log("name:" + props.pName);
    
    updateMarkerReviews(session, marker.webId, props.pMarkId, marker.descripcion, marker.comentario, marker.puntuacion, marker.imagen, props.pName);
    //navigate('/map');
    (document.getElementById("window-notice") as HTMLInputElement).style.visibility = "hidden";
  };

    
  return (
    <>
      <div>
        <h1>Añade una valoración</h1>
        <div>
        <form id= "formReview" onSubmit={handleSubmit}>
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
            <p className="comment-text">Aqui irian fotos</p>
            <p className="comment-text">Ejemplo comentario</p>
            <div className="comment-rating">
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
