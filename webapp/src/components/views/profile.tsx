import React, { useState, useRef, useEffect } from "react";
import { createPortal, render, unmountComponentAtNode } from 'react-dom';

import { useSession, CombinedDataProvider, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { useNavigate, Navigate } from "react-router-dom";
import { getProfileSolid } from "../profile";
import { Session } from '@inrupt/solid-client-authn-browser';

export async function getProfile(session: Session) {

  var perfil;
  if (session.info.webId !== undefined) {
    perfil = await getProfileSolid(session.info.webId, session);

    if (perfil !== undefined) {

      let perfiles = perfil[0];
      let direccion = perfil[1];
      let nombre = perfil[2] as string;
      let foto = perfil[3] as string;
      let telefono = perfil[4] as string;
      let nombrecorto = perfil[5] as string;


      const imgElement = new Image();
      imgElement.src = foto;

      (document.getElementById("name") as HTMLElement).innerHTML = nombre;
      (document.getElementById("email") as HTMLElement).innerHTML = nombre;
      (document.getElementById("telefono") as HTMLElement).innerHTML = telefono;
      (document.getElementById("nombreCorto") as HTMLElement).innerHTML = nombrecorto;



    }

  }
}

function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();
  getProfile(session);
  //console.log(session.info.webId);
  const logOut = () => {
    session.logout();
    navigate('/login');

  };
  const callMap = () => {

    // This will navigate to first component
    navigate('/map');
    //<Navigate to="/map" replace={true}/>
  };

  return (

    <>

      <div className="App">

        <header>
          <p>LoMap</p>
          <nav>
            <button className="separador" onClick={callMap}>Mapa</button>
            <button onClick={logOut}>Cerrar sesión</button>

          </nav>
        </header>
        <h1 id="nombreCorto"> Bienvenido/a </h1>
        <div className="profile">

          <h2 id="name"> Nombre de usuario </h2>
          <h3 id="telefono">Telefono </h3>
          <h3 id="email"> Correo electrónico : </h3>
        </div>
      </div>

      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>


  );
}

export default Profile;
