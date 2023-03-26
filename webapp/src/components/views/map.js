import React, { useRef, useEffect, useState } from 'react';

import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import { center, zoom } from "./data";
import mapboxgl, { Map } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";
import { makeMap } from "./mapa";
import { Container } from "@material-ui/core";

import { useNavigate } from 'react-router-dom';

function MapPage() {
  
  const navigate = useNavigate();
  const callPerfil = () => {
  
    // This will navigate to first component
    navigate('/profile'); 
  };
  
  mapboxgl.accessToken = mapAccessToken;
  
    const mapContainer = useRef(null);
    const map = useRef(null);
    const edit = useRef(null);
    const guardar = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
     
    var editing = false;

    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [lng, lat],
    zoom: zoom
    });

    map.current.on("click", function (e) {
      if (editing) {
        let z = JSON.stringify(e.lngLat.wrap()).split(",");
        let x = Number.parseFloat(z[0].replace('{"lng":', ""));
        let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));
  
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<p id="nombre">Nuevo punto</p><a href="#" class="del">Eliminar</a> <a href="#" class="ed">Editar</a>'
        );
  
        let marker = new mapboxgl.Marker()
          .setLngLat([x, y])
          .setPopup(popup)
          .addTo(map.current);
        let markerDiv = marker.getElement();
  
        //saveSolidDatasetInContainer("inrut.net/pelayodc", {Readonly<Record<String>>"Nuevo punto"});
  
        popup.on("open", () => {
          if(popup
            .getElement()
            .getElementsByClassName("del").length==0){
              return;
            }
          
          popup
            .getElement()
            .getElementsByClassName("del")[0]
            .addEventListener("click", () => {
              marker.remove();
            });
  
          popup
            .getElement()
            .getElementsByClassName("ed")[0]
            .addEventListener("click", () => {
              popup.setHTML(
                '<label for="desc">Descripción:</label><input type="text" id="desc" ref={guardar} class="desc"><a href="#" class="aced">Guardar</a>'
              );
              popup
                .getElement()
                .getElementsByClassName("aced")[0]
                .addEventListener("click", () => {
                  console.log("asd");
                  //Guardar los nuevos datos en el pod
                  popup.setHTML(
                    "<p>" +
                      guardar.current instanceof HTMLInputElement
                       +
                      '</p><a href="#" class="del">Eliminar</a> <a href="#" class="ed">Editar</a>'
                  );
  
                  marker.togglePopup();
                });
            });
        });
  
        markerDiv.addEventListener("click", () => {
          if (!editing) {
            //marker.remove()
            marker.togglePopup();
          }
        });
      }
    }); 
      
    //TODO: guardarlos en el pod

    //Botón edit
    edit.current.addEventListener("click", () => {
    editing = !editing;
    console.log(editing);
    });
   });  

    useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
    });
    });

  return (
    <>
      <header>
        <p>LoMap</p>
        <nav>
        <button className="separador" onClick={callPerfil}>Ver perfil</button>
          <button>cerrar sesión</button>
        </nav>
      </header>
      <h1> Mapa </h1>
      <div id="app">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
      </div>
      <a href="#" className="btn-flotante" id="edit" ref={edit}>
        <img src="./pencil.png" id="pencil" />
      </a>

      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>
  );
}

export default MapPage;
