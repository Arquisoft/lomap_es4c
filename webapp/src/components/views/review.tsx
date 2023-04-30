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

type ReviewProps = {
  pName: string;
  pMarkId: string;
};

function Review(props: ReviewProps): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();

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




    }
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
