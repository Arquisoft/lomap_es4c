import React, { useRef, useEffect, useState } from "react";

import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "./style.css";
import "./review.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { center, zoom } from "./data";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";
import Review from "./review";

function MapPage() {
  mapboxgl.accessToken = mapAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const edit = useRef(null);
  const addroutebtn = useRef(null);

  const winpopup = useRef(null);
  const close = useRef(null);

  var editing = false;
  var addroute = false;
  var routeCount=0;

  var points = [];

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

    map.current.addControl(new mapboxgl.FullscreenControl());

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    map.current.on("click", function (e) {
      if (editing) {
        addMarker(
          e,
          map,
          editing,
          playasMarks,
          restaurantesMarks,
          monumentosMarks,
          otrosMarks
        );
      }
      if (addroute) {
        AddPoint(e,points);
      }
    });

    //TODO: guardarlos en el pod

    //Botón edit
    edit.current.addEventListener("click", () => {
      editing = !editing;
      addroute = false;
      console.log(editing);
    });

    //Botón ruta
    addroutebtn.current.addEventListener("click", () => {
      if (addroute) {
        //guardar punto
        map.current.addSource("route"+routeCount, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: points,
            },
          },
        });
        map.current.addLayer({
          id: "route"+routeCount,
          type: "line",
          source: "route"+routeCount,
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#888",
            "line-width": 8,
          },
        });
        addroute = false;
        routeCount++;
        document.getElementById("pencil-route").src="./images/add.png";
      } else {
        addroute = true;
        points = [];
        editing = false;
        console.log(editing);
        document.getElementById("pencil-route").src="./images/save.png";
      }
    });

    //Ventana emergente
    close.current.addEventListener("click", () => {
      winpopup.current.style.visibility = "hidden";
    });

    winpopup.current.addEventListener("click", () => {
      winpopup.current.style.visibility = "hidden";
    });

    //Filtros
    loadFiltros(
      filtroTodo,
      filtroPlayas,
      filtroRestaurantes,
      filtroMonumentos,
      filtroOtros,
      playasMarks,
      restaurantesMarks,
      monumentosMarks,
      otrosMarks
    );
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
      <div id="filtros">
        <a href="#" id="filterTodo" ref={filtroTodo}>
          Todo
        </a>
        <a href="#" id="filterPlayas" ref={filtroPlayas}>
          Playas
        </a>
        <a href="#" id="filterMonumentos" ref={filtroMonumentos}>
          Monumentos
        </a>
        <a href="#" id="filterRestaurantes" ref={filtroRestaurantes}>
          Restaurantes
        </a>
        <a href="#" id="filterOtros" ref={filtroOtros}>
          Otros
        </a>
      </div>
      <div id="app">
        <div ref={mapContainer} className="map-container" />
      </div>
      <a href="#" className="btn-flotante" id="edit" ref={edit}>
        <img src="./images/add.png" id="pencil" />
      </a>
      <a
        href="#"
        className="btn-flotante-route"
        id="editroute"
        ref={addroutebtn}
      >
        <img src="./images/add.png" id="pencil-route" />
      </a>
      <div className="window-notice" id="window-notice" ref={winpopup}>
        <div className="content id=content">
          <Review />

          <div className="content-buttons">
            <a href="#" ref={close} id="close-button">
              Aceptar
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

document.addEventListener("click", function (event) {
  if (document.getElementById("window-notice") != null) {
    document
      .getElementById("formReview")
      .addEventListener("click", function (event) {
        event.stopPropagation();
      });
  }
});

function loadFiltros(
  todo,
  playas,
  restaurantes,
  monumentos,
  otros,
  plist,
  rlist,
  mlist,
  olist
) {
  todo.current.addEventListener("click", () => {
    plist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    mlist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    rlist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    olist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
  });

  playas.current.addEventListener("click", () => {
    plist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    mlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    rlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    olist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
  });

  monumentos.current.addEventListener("click", () => {
    plist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    mlist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    rlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    olist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
  });

  restaurantes.current.addEventListener("click", () => {
    plist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    mlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    rlist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
    olist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
  });

  otros.current.addEventListener("click", () => {
    plist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    mlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    rlist.forEach((element) => {
      element.getElement().style.visibility = "hidden";
    });
    olist.forEach((element) => {
      element.getElement().style.visibility = "visible";
    });
  });
}

function markerFuncs(marker, popup, nombre, tipo) {
  popup
    .getElement()
    .getElementsByClassName("del")[0]
    .addEventListener("click", () => {
      marker.remove();
    });

  popup
    .getElement()
    .getElementsByClassName("val")[0]
    .addEventListener("click", () => {
      document.getElementById("window-notice").style.visibility = "visible";
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
          nombre = popup.getElement().getElementsByClassName("desc")[0].value;
          let e = document.getElementById("tipo");
          tipo = e.options[e.selectedIndex].text;

          //Guardar los nuevos datos en el pod
          popup.setHTML(
            '<p id="nombre">Nombre: ' +
              nombre +
              '</p><p id="tipo">Tipo: ' +
              tipo +
              '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a> <a href="#" class="val"><img src="/src/star.png" id="pencilpp" /></a>'
          );

          marker.togglePopup();
        });
    });
}

function addMarker(
  e,
  map,
  editing,
  playasMarks,
  restaurantesMarks,
  monumentosMarks,
  otrosMarks
) {
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
          nombre = popup.getElement().getElementsByClassName("desc")[0].value;
          let e = document.getElementById("tipo");
          tipo = e.options[e.selectedIndex].text;

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
              '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a> <a href="#" class="val"><img src="/src/star.png" id="pencilpp" /></a>'
          );

          markerFuncs(marker, popup, nombre, tipo);
        });
    } else {
      popup.on("open", () => {
        if (popup.getElement().getElementsByClassName("del").length === 0) {
          return;
        }

        markerFuncs(marker, popup, nombre, tipo);
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

function AddPoint(e,points) {
  let z = JSON.stringify(e.lngLat.wrap()).split(",");
  let x = Number.parseFloat(z[0].replace('{"lng":', ""));
  let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));
  points.push([x,y]);
  console.log(x+"-"+y);
}

export default MapPage;
