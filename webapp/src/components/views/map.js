import React, { useRef, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import { center, zoom } from "./data";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";
import { useNavigate, Navigate } from 'react-router-dom';
import { addMarker } from "../marker";
//import MapMarker, { IMarker } from "../../../../restapi/src/models/marker";

import { MapMarker } from '../../shared/shareddtypes';

import { useSession } from "@inrupt/solid-ui-react";

function MapPage() {

  const navigate = useNavigate();
  const { session } = useSession();
  //console.log(session.info.webId);
  const callPerfil = () => {
  
    // This will navigate to first component
    navigate('/profile'); 
    //<Navigate to="/profile" replace={true}/>
  };
  mapboxgl.accessToken = mapAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const edit = useRef(null);
  
  const winpopup = useRef(null);
  const close = useRef(null);
  
  var editing = false;

  //Listas para filtros
  const filtroTodo = useRef(null);
  const filtroPlayas = useRef(null);
  const filtroRestaurantes = useRef(null);
  const filtroMonumentos = useRef(null);
  const filtroOtros = useRef(null);
  
  var playasMarks = [];
  var restaurantesMarks = [];
  var monumentosMarks = [];
  var otrosMarks = [];

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/${mapStyleId}`,
      center: center,
      zoom: zoom,
    });

    map.current.on("click", function (e) {
      if (editing) {
        let z = JSON.stringify(e.lngLat.wrap()).split(",");
        let x = Number.parseFloat(z[0].replace('{"lng":', ""));
        let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));

        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="Nuevo Punto"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
        );

        let guardado = false;
        let deleted = false;
        let nombre = "Nuevo Punto";
        let tipo = "Playa";

        let marker = new mapboxgl.Marker()
          .setLngLat([x, y])
          .setPopup(popup)
          .addTo(map.current);
        let markerDiv = marker.getElement();

        //saveSolidDatasetInContainer("inrut.net/pelayodc", {Readonly<Record<String>>"Nuevo punto"});

        popup.on("close", () => {
          if (!guardado && !deleted) {
            deleted = true;
            marker.remove();
          }
        });

        popup.on("open", () => {
          if (!guardado) {
            popup
              .getElement()
              .getElementsByClassName("guar")[0]
              .addEventListener("click", () => {
                guardado = true;
                nombre = popup
                  .getElement()
                  .getElementsByClassName("desc")[0].value;
                let e = document.getElementById("tipo");
                tipo = e.options[e.selectedIndex].text;
                //const marker = new MapMarker(x, y, nombre, tipo);
                //NO PUEDE SER UN NEW, PROBAR LOS TIPOS COMO SE CREAN NUEVOS
                //const newMarker = MapMarker{ webId:session.info.webId , x, y, nombre};
                /*
                var mark: MapMarker = {
                  webId: session.info.webId,
                  id: 0,
                  titulo: nombre,
                  descripcion: "",
                  latitud: x,
                  longitud: y,
                  categoria: tipo,
                  comentario: "",
                  puntuacion: 0,
                  imagen: ""
                };
              */

              
                addMarker(session.info.webId,nombre, x, y, tipo, "https://inrupt.net/", session);
                switch (tipo) {
                  case "Playa":
                    playasMarks.push(marker);
                    break;
                  case "Restaurante":
                    restaurantesMarks.push(marker);
                    break;
                  case "Monumento":
                    monumentosMarks.push(marker);
                    break;
                  default:
                    otrosMarks.push(marker);
                    break;
                }

                popup.setHTML(
                  '<p id="nombre">Nombre: ' +
                    nombre +
                    '</p><p id="tipo">Tipo: ' +
                    tipo +
                    '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                );

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
                      '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="' +
                        nombre +
                        '"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
                    );
                    popup
                      .getElement()
                      .getElementsByClassName("guar")[0]
                      .addEventListener("click", () => {
                        nombre = popup
                          .getElement()
                          .getElementsByClassName("desc")[0].value;
                        let e = document.getElementById("tipo");
                        tipo = e.options[e.selectedIndex].text;

                        //Guardar los nuevos datos en el pod
                        popup.setHTML(
                          '<p id="nombre">Nombre: ' +
                            nombre +
                            '</p><p id="tipo">Tipo: ' +
                            tipo +
                            '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                        );

                        marker.togglePopup();
                      });
                  });
              });
          } else {
            popup.on("open", () => {
              if (
                popup.getElement().getElementsByClassName("del").length === 0
              ) {
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
                    '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="' +
                      nombre +
                      '"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
                  );
                  popup
                    .getElement()
                    .getElementsByClassName("guar")[0]
                    .addEventListener("click", () => {
                      nombre = popup
                        .getElement()
                        .getElementsByClassName("desc")[0].value;
                      let e = document.getElementById("tipo");
                      tipo = e.options[e.selectedIndex].text;

                      //Guardar los nuevos datos en el pod
                      popup.setHTML(
                        '<p id="nombre">Nombre: ' +
                          nombre +
                          '</p><p id="tipo">Tipo: ' +
                          tipo +
                          '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                      );

                      marker.togglePopup();
                    });
                });
            });
          }
        });
        marker.togglePopup();
        editing = false;

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

    close.current.addEventListener('click', () => {
      winpopup.current.style.visibility='hidden';
    });

    winpopup.current.addEventListener('click', () => {
      winpopup.current.style.visibility='hidden';
    });

    filtroTodo.current.addEventListener('click', () => {
      playasMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      monumentosMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      restaurantesMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      otrosMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
    });
    
    filtroPlayas.current.addEventListener('click', () => {
      playasMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      monumentosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      restaurantesMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      otrosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
    });
    
    filtroMonumentos.current.addEventListener('click', () => {
      playasMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      monumentosMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      restaurantesMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      otrosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
    });
  
    filtroRestaurantes.current.addEventListener('click', () => {
      playasMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      monumentosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      restaurantesMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
      otrosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
    });
    
    filtroOtros.current.addEventListener('click', () => {
      playasMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      monumentosMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      restaurantesMarks.forEach((element) => {
        element.getElement().style.visibility = 'hidden'
      });
      otrosMarks.forEach((element) => {
        element.getElement().style.visibility = 'visible'
      });
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
      <div id="filtros">
        <a href="#" id="filterTodo" ref={filtroTodo}>Todo</a>
        <a href="#" id="filterPlayas" ref={filtroPlayas}>Playas</a>
        <a href="#" id="filterMonumentos" ref={filtroMonumentos}>Monumentos</a>
        <a href="#" id="filterRestaurantes" ref={filtroRestaurantes}>Restaurantes</a>
        <a href="#" id="filterOtros" ref={filtroOtros}>Otros</a>
      </div>
      <div id="app">
        <div ref={mapContainer} className="map-container" />
      </div>
      <a href="#" className="btn-flotante" id="edit" ref={edit}>
        <img src="./images/add.png" id="pencil" />
      </a>
      <div className="window-notice" id="window-notice" ref={winpopup}>
        <div className="content">
          <h2>Valoraciones</h2>    
          <div className="content-text">Aquí estarán la lista de valoraciones</div>
          <div className="content-buttons"><a href="#" ref={close} id="close-button">Aceptar</a></div>
        </div>
      </div>
    </>
  );
}

export default MapPage;
