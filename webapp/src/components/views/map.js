import React, { useRef, useEffect, useState } from 'react';

import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import { center, zoom } from "./data";
import mapboxgl, { Map } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";

function MapPage() {

  mapboxgl.accessToken = mapAccessToken;
  
    const mapContainer = useRef(null);
    const map = useRef(null);
    const edit = useRef(null);
     
    var editing = false;

    useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: center,
    zoom: zoom
    });

    map.current.on("click", function (e) {
      if (editing) {
        let z = JSON.stringify(e.lngLat.wrap()).split(",");
        let x = Number.parseFloat(z[0].replace('{"lng":', ""));
        let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));
  
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="Nuevo Punto"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
          );
  
        let guardado = false
        let deleted = false
        let nombre = 'Nuevo Punto'
        let tipo = 'Playa'

        let marker = new mapboxgl.Marker()
          .setLngLat([x, y])
          .setPopup(popup)
          .addTo(map.current);
        let markerDiv = marker.getElement();
  
        //saveSolidDatasetInContainer("inrut.net/pelayodc", {Readonly<Record<String>>"Nuevo punto"});
  
        popup.on('close', () => {
          if (!guardado && !deleted) {
            deleted = true
            marker.remove()
          }
        })

        popup.on("open", () => {
          if (!guardado) {
            popup
              .getElement()
              .getElementsByClassName('guar')[0]
              .addEventListener('click', () => {
                guardado = true
                nombre = popup.getElement().getElementsByClassName('desc')[0].value
                let e = document.getElementById('tipo');
                tipo = e.options[e.selectedIndex].text
  
                popup.setHTML(
                  '<p id="nombre">Nombre: ' +
                    nombre +
                    '</p><p id="tipo">Tipo: ' +
                    tipo +
                    '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                )
  
                popup
                  .getElement()
                  .getElementsByClassName('del')[0]
                  .addEventListener('click', () => {
                    marker.remove()
                  })
  
                popup
                  .getElement()
                  .getElementsByClassName('ed')[0]
                  .addEventListener('click', () => {
                    popup.setHTML(
                      '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="' +
                        nombre +
                        '"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
                    )
                    popup
                      .getElement()
                      .getElementsByClassName('guar')[0]
                      .addEventListener('click', () => {
                        nombre = popup.getElement().getElementsByClassName('desc')[0].value
                        let e = document.getElementById('tipo')
                        tipo = e.options[e.selectedIndex].text
  
                        //Guardar los nuevos datos en el pod
                        popup.setHTML(
                          '<p id="nombre">Nombre: ' +
                            nombre +
                            '</p><p id="tipo">Tipo: ' +
                            tipo +
                            '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                        )
  
                        marker.togglePopup()
                      })
                  })
              })
          } else {
            popup.on('open', () => {
              if (popup.getElement().getElementsByClassName('del').length === 0) {
                return
              }
  
              popup
                .getElement()
                .getElementsByClassName('del')[0]
                .addEventListener('click', () => {
                  marker.remove()
                })
  
              popup
                .getElement()
                .getElementsByClassName('ed')[0]
                .addEventListener('click', () => {
                  popup.setHTML(
                    '<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="' +
                      nombre +
                      '"/><label for="desc">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
                  )
                  popup
                    .getElement()
                    .getElementsByClassName('guar')[0]
                    .addEventListener('click', () => {
                      nombre = popup.getElement().getElementsByClassName('desc')[0].value
                      let e = document.getElementById('tipo')
                      tipo = e.options[e.selectedIndex].text
  
                      //Guardar los nuevos datos en el pod
                      popup.setHTML(
                        '<p id="nombre">Nombre: ' +
                          nombre +
                          '</p><p id="tipo">Tipo: ' +
                          tipo +
                          '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a>'
                      )
  
                      marker.togglePopup()
                    })
                })
            })
          }
        });
        marker.togglePopup()
        editing = false
        
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

  return (
    <>
      <header>
        <p>LoMap</p>
        <nav>
          <button className="separador">ver perfil</button>
          <button>cerrar sesión</button>
        </nav>
      </header>
      <div id="app">
      <div ref={mapContainer} className="map-container" />
      </div>
      <a href="#" className="btn-flotante" id="edit" ref={edit}>
        <img src="./images/add.png" id="pencil" />
      </a>
    </>
  );
}

export default MapPage;
