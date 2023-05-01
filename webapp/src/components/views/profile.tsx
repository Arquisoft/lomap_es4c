import React, { useState, useRef, useEffect } from "react";
import { createPortal, render, unmountComponentAtNode } from 'react-dom';
import "./styleProfile.css";
import { useSession, CombinedDataProvider, Image,TableColumn, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { useNavigate, Navigate } from "react-router-dom";
import { getProfileSolid } from "../profile";
import { Session } from '@inrupt/solid-client-authn-browser';
import { property } from "lodash";

export async function getProfile(webId: string) {


  var perfil;

  perfil = await getProfileSolid(webId);

  if (perfil !== undefined) {

    let perfiles = perfil[0] as string[];
    let direccion = perfil[1];
    let nombre = perfil[2] as string;
    let foto = perfil[3] as string;
    let telefono = perfil[4] as string;
    let organizacion = perfil[5] as string;
    let nombrecorto = perfil[6] as string;


    
   

    (document.getElementById("nombre-Corto") as HTMLElement).innerHTML = 'Bienvenido/a ' + nombrecorto;
    (document.getElementById("email") as HTMLElement).innerHTML = 'Nombre: ' + nombre;
    (document.getElementById("telefono") as HTMLElement).innerHTML = 'Teléfono ' + telefono;
    (document.getElementById("name") as HTMLElement).innerHTML = nombrecorto;
    for (let i = 0; i < perfiles?.length; i++) {
      var lista = (document.createElement("li"));
      lista.innerHTML = perfiles[i];

      (document.getElementById("amigos") as HTMLInputElement).appendChild(lista);

    }


  }



}

function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();
  let webId = session.info.webId as string;



  const logOut = () => {
    session.logout();
    navigate('/login');

  };
  const callMap = () => {

    // This will navigate to first component
    navigate('/map');
    //<Navigate to="/map" replace={true}/>
  };
/*
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
        <h1 id="nombre-Corto"> Bienvenido/a </h1>
        <div className="profile">

          <p id="name"> Nombre: </p>
          <p id="telefono">Teléfono </p>
          <p id="email"> Correo electrónico : </p>
          <div className="div-amigos">
            <ul id="amigos">Listado de amigos : </ul>

          </div>
        </div>
      </div>

      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>


  );*/

  return (

    <>

  <header>
  <p>LoMap</p>
  <nav>
  <button className="separador" onClick={callMap}>Mapa</button>
  <button onClick={logOut}>Cerrar sesión</button>
  
  </nav>
</header>

<div id ="profile" className ="profile">


{session.info.webId ? (
  <CombinedDataProvider 
    datasetUrl={session.info.webId} 
    thingUrl={session.info.webId}>
    <h1 id ="bienvenida"> Bienvenido/a<Text id="nombre" property={VCARD.fn.iri.value}> </Text> </h1>
    <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
      <Image property={VCARD.hasPhoto.iri.value} id="imagen-perfil" width={480} />
    </CardActionArea>
    <CardContent>
      <Typography variant="body2" id="info" color="textSecondary" component="p" style={{ display: "block", alignItems: "left" }}>
      <p id="pinfo">Nombre:<Text id="info" property={FOAF.name.iri.value}> </Text> </p>
       <p id="pinfo">Organización:<Text id="info"  property={VCARD.organization_name.iri.value} /></p>
       <p id="pinfo">Dirección:<Text  id="info" property={VCARD.hasAddress.iri.value} /></p>
       <p id="pinfo">Email:<Text id="info" property={VCARD.hasEmail.iri.value} /></p>
       <p id="pinfo">Teléfono:<Text id="info" property={VCARD.hasTelephone.iri.value} /></p>
      </Typography>
    </CardContent>

    
  
</CombinedDataProvider>
): null }

</div>
</>
  
  );
}

export default Profile;
