import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import "./style.css";
import "./review.css";
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { center, zoom } from "./data";
import mapboxgl, { Map, Marker } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";
import Review from "./review";
import { useNavigate, Navigate } from 'react-router-dom';
import { addMarker, updateMarker, getMarkers,removeMarker,getFriendsSolid } from "../marker";
import { useSession } from "@inrupt/solid-ui-react";

var dict = {};
var names = [];

var playasMarks = [];
var restaurantesMarks = [];
var monumentosMarks = [];
var otrosMarks = [];

var editing = false;
var addroute= false;

var routeCount=0;
var points = [];

var markerId = "";
var markerName = "";

function MapPage() {

  const navigate = useNavigate();
  const { session } = useSession();

  const callPerfil = () => {
    navigate('/profile'); 
  };
  const logOut = () => {
    session.logout();
    navigate('/login'); 
  };

  mapboxgl.accessToken = mapAccessToken;

  const mapContainer = useRef(null);
  const map = useRef(null);
  
  const edit = useRef(null);
  const addroutebtn = useRef(null);
  const winpopup = useRef(null);
  const close = useRef(null);

  //botones para filtros
  const filtroTodo = useRef(null);
  const filtroPlayas = useRef(null);
  const filtroRestaurantes = useRef(null);
  const filtroMonumentos = useRef(null);
  const filtroOtros = useRef(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: `mapbox://styles/${mapStyleId}`,
      center: center,
      zoom: zoom,
    });
    
    loadMarkers(map, session);

    map.current.addControl(new mapboxgl.FullscreenControl());
 
    const coordinatesGeocoder = function (query) {
      function coordinateFeature(name, lng, lat) {
        return {
        center: [lng, lat],
        geometry: {
        type: 'Point',
        coordinates: [lng, lat]
        },
        place_name: name,
        place_type: ['coordinate'],
        properties: {},
        type: 'Feature'
        };
      }
        
      const geocodes = [];
      
      for (let i=0;i<names.length;i++) {
          if(names[i].includes(query)) {
              geocodes.push(coordinateFeature(names[i],dict[names[i]][0],dict[names[i]][1]));
          }
      }
        
      return geocodes;  
    };

    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: coordinatesGeocoder,
        mapboxgl: mapboxgl,
        marker: false,
        zoom: 12
      })
    );

    map.current.on("click", function (e) {
      if (editing) {  
        addMapMarker(e,map, session);
      }
      if(addroute) {
        AddPoint(e,points,map);
      }
    });

    //Botón edit
    edit.current.addEventListener("click", () => {
      editAction(map);
    });

    //Botón ruta
    addroutebtn.current.addEventListener("click", () => {
      addrouteAction(map);
    });

    close.current.addEventListener('click', () => {
      winpopup.current.style.visibility='hidden';
    });

    winpopup.current.addEventListener('click', () => {
      winpopup.current.style.visibility='hidden';
    });
    
    //Filtros
    loadFiltros(filtroTodo,filtroPlayas,filtroRestaurantes,filtroMonumentos,filtroOtros,playasMarks,restaurantesMarks,monumentosMarks,otrosMarks);
  });

  return (
    <>
      <header>
        <p>LoMap</p>
        <nav>
          <button className="separador" onClick={callPerfil}>Ver perfil</button>
          <button onClick={logOut}>Cerrar sesión</button>
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
      <a href="#" className="btn-flotante-route" id="editroute" ref={addroutebtn}>
        <img src="./images/add-route.png" id="pencil-route" />
      </a>
      <div className="window-notice" id="window-notice" ref={winpopup}>
        <div className="content id=content">
          <Review pName = {markerName} pMarkId={markerId}/>
          <div className="content-buttons"><a href="#" ref={close} id="close-button">Aceptar</a></div>
        </div>
      </div>
    </>
  );
}


document.addEventListener('click', function(event) {
  if(document.getElementById('window-notice')!=null){
    
      document.getElementById('formReview').addEventListener('click', function(event) {
    
        event.stopPropagation();
        
     
    });}
  
});

function editAction(map) {
  if(addroute){
    addroute=false;
    document.getElementById("pencil-route").src="./images/add-route.png";
    document.getElementById("pencil").src="./images/add.png";

    //Borrar layer si existe
    if(map.current.getLayer("puntos") != undefined){
      map.current.removeLayer("puntos");
      map.current.removeSource("puntos");
    }
  } else {
    if(editing) {
      //addroutebtn.current.style.visibility='visible';
      document.getElementById("editroute").style.visibility="visible";
      document.getElementById("pencil").src="./images/add.png";
    } else {
      //addroutebtn.current.style.visibility='hidden';
      document.getElementById("editroute").style.visibility="hidden";
      document.getElementById("pencil").src="./images/cross.png";
    }
    editing = !editing;
  }
}

function addrouteAction(map) {
  if(editing){
    return;
  }

  if (addroute) {
    //Borrar layer si existe
    if(map.current.getLayer("puntos") != undefined){
      map.current.removeLayer("puntos");
      map.current.removeSource("puntos");
    }

    //guardar ruta
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
        "line-width": 5,
      },
    });
    addroute = false;
    routeCount++;
    document.getElementById("pencil-route").src="./images/add-route.png";
    document.getElementById("pencil").src="./images/add.png";
  } else {
    addroute = true;
    points = [];
    document.getElementById("pencil-route").src="./images/save.png";
    document.getElementById("pencil").src="./images/cross.png";
  }
}

function loadFiltros(todo,playas,restaurantes,monumentos,otros) {
  const filters = [
    {button: todo.current, list: [playasMarks, monumentosMarks, restaurantesMarks, otrosMarks], visibility: 'visible'},
    {button: playas.current, list: [playasMarks], visibility: 'visible'},
    {button: monumentos.current, list: [monumentosMarks], visibility: 'visible'},
    {button: restaurantes.current, list: [restaurantesMarks], visibility: 'visible'},
    {button: otros.current, list: [otrosMarks], visibility: 'visible'}
  ];

  filters.forEach(filter => {
    filter.button.addEventListener('click', () => {
      playasMarks.concat(monumentosMarks, restaurantesMarks, otrosMarks).forEach(element => {
        element.getElement().style.visibility = 'hidden';
      });

      filter.list.forEach( e => { e.forEach(element => {
        element.getElement().style.visibility = filter.visibility;
      }); });
    });
  });
}

async function markerFuncs(marker, popup, nombre, descripcion, tipo, x, y, session, markId) {
  popup.on("close", () => {
    popup.setHTML(setPointHTML(nombre, descripcion, tipo));
  });

  popup
    .getElement()
    .getElementsByClassName("del")[0]
    .addEventListener("click", () => {
      removeMarker(session.info.webId, markId, session);
      removeCategoria(tipo, marker);
      names.splice(names.indexOf(nombre), 1);
      marker.remove();
    });

    popup
    .getElement()
    .getElementsByClassName('val')[0]
    .addEventListener('click', () => {
      document.getElementById('window-notice').style.visibility='visible';
      console.log('markId: '+ markId.substring(markId.lastIndexOf("#") + 1));
      markerId = markId;
      markerName = nombre;
      console.log(nombre);
      var obj = {pNombre: nombre, pMarkId: markId.substring(markId.lastIndexOf("#") + 1), pSession: session, pSessionId: session.info.webId}
      //ReactDOM.render(<Review {...obj}/>, document.getElementById('window-notice'));
    })

    popup
    .getElement()
    .getElementsByClassName("ed")[0]
    .addEventListener("click", () => {
      popup.setHTML(setEditHTML(nombre,descripcion,tipo));
      popup
        .getElement()
        .getElementsByClassName("guar")[0]
        .addEventListener("click", () => {
          names.splice(names.indexOf(nombre), 1);
          nombre = popup
            .getElement()
            .getElementsByClassName("name")[0].value;
          descripcion = popup
            .getElement()
            .getElementsByClassName("desc")[0].value;
          names.push(nombre);
          dict[nombre] = [x,y];

          let e = document.getElementById("tipo");

          removeCategoria(tipo,marker);
          tipo = e.options[e.selectedIndex].text;
          addCategoria(tipo,marker); 
          
          //Guardar los nuevos datos en el pod
          updateMarker(session, session.info.webId, markId, tipo, nombre);
          popup.setHTML(setPointHTML(nombre,descripcion,tipo));

          marker.togglePopup();
        });
    });
}

function addMapMarker(e, map, session) {
  let z = JSON.stringify(e.lngLat.wrap()).split(",");
  let x = Number.parseFloat(z[0].replace('{"lng":', ""));
  let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));

  let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
    '<label for="name">Nombre:</label><input type="text" id="name" class="name" value="Nuevo Punto"/><label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="Nuevo Punto"/><label for="tipo">Tipo:</label><select id="tipo"><option value="playa">Playa</option><option value="monumento">Monumento</option><option value="restaurante">Restaurante</option><option value="otro">Otro</option></select><button href="#" class="guar">Guardar</button>'
  );

  let guardado = false;
  let deleted = false;
  let nombre = "Nuevo Punto";
  let descripcion = "Nuevo Punto";
  let tipo = "Playa";
  let markId;

  let marker = new mapboxgl.Marker()
    .setLngLat([x, y])
    .setPopup(popup)
    .addTo(map.current);

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
          editAction(map);
          guardado = true;
          nombre = popup
            .getElement()
            .getElementsByClassName("name")[0].value;
          descripcion = popup
            .getElement()
            .getElementsByClassName("desc")[0].value;
          let e = document.getElementById("tipo");
          tipo = e.options[e.selectedIndex].text;

          markId = addMarker(session.info.webId,nombre, x, y, tipo, "https://inrupt.net/", session); //pasar descripcion

          addCategoria(tipo,marker);
          names.push(nombre);
          dict[nombre] = [x,y];

          popup.setHTML(setPointHTML(nombre,descripcion,tipo));

          markerFuncs(marker,popup,nombre,descripcion,tipo,x,y,session,markId);
        });
    } else {
      popup.on("open", () => {
        if (
          popup.getElement().getElementsByClassName("del").length === 0
        ) {
          return;
        }

        if(editing || addroute){
          marker.togglePopup();
          return;
        }

        markerFuncs(marker,popup,nombre,descripcion,tipo,x,y,session, markId);
      });
    }
  });
  marker.togglePopup();
}

async function loadMarkers(map, session){
  let points = await getMarkers(session, session.info.webId);
  let friendsPoint = await getFriendsSolid( session.info.webId,session);

  for(let i=0; i<points.length; i++){
    loadMarker(points[i], map, session);
  }

  for(let i=0; i<friendsPoint.length; i++){
    console.log("entra en el for de amigos " + friendsPoint);
    var array=await friendsPoint[i];
    console.log((await array).length)
    for(let j=0; j<array.length; j++){
      console.log("Nombre del punto" + array[j].nombre)
    
    console.log("entra en el for de amigos "+ friendsPoint[0].nombre);
    loadFriendMarker(array[j], map,session);
  }
}
}

async function loadMarker(point, map, session){
  let id = point[0];
  let nombre = point[1];
  let descripcion = "Por cargar en pod"; //point[5]
  let x = Number.parseFloat(point[2]);
  let y = Number.parseFloat(point[3]);
  let categoria = point[4];

  let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(setPointHTML(nombre, descripcion,categoria));

  let marker = new mapboxgl.Marker()
    .setLngLat([x, y])
    .setPopup(popup)
    .addTo(map.current);

  addCategoria(categoria,marker);

  popup.on("open", () => {
    if(editing || addroute){
      marker.togglePopup();
      return;
    }

    markerFuncs(marker,popup,nombre,descripcion,categoria,x,y,session, id);
  });

  names.push(nombre);
  dict[nombre]=[x,y];
}

async function loadFriendMarker(point, map, session){
  let id = point[0];
  let nombre = point[1];
  let descripcion = "Por cargar en pod"; //point[5]
  let x = Number.parseFloat(point[2]);
  let y = Number.parseFloat(point[3]);
  let categoria = point[4];

  let popup = new mapboxgl.Popup({ color: 'red', offset: 25 }).setHTML(setFriendPointHTML(nombre, descripcion,categoria));

  let marker = new mapboxgl.Marker()
    .setLngLat([x, y])
    .setPopup(popup)
    .addTo(map.current);

  addCategoria(categoria,marker);

  popup.on("open", () => {
    if(editing || addroute){
      marker.togglePopup();
      return;
    }
  });

  names.push(nombre);
  dict[nombre]=[x,y];
}

function AddPoint(e,points,map) {
  let z = JSON.stringify(e.lngLat.wrap()).split(",");
  let x = Number.parseFloat(z[0].replace('{"lng":', ""));
  let y = Number.parseFloat(z[1].replace('"lat":', "").replace("}", ""));

  points.push([x,y]);

  //Borrar layer si existe
  if(map.current.getLayer("puntos") != undefined){
    map.current.removeLayer("puntos");
    map.current.removeSource("puntos");
  }

  if(points.length==1) {
    map.current.addSource('puntos', {
      'type': 'geojson',
      'data': {
        'type': 'FeatureCollection',
        'features': [
          {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'Point',
            'coordinates': points[0]
          }
          }
        ]
      }
    });
    map.current.addLayer({
      'id': 'puntos',
      'type': 'circle',
      'source': 'puntos',
      'paint': {
      'circle-color': '#4264fb',
      'circle-radius': 8,
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ffffff'
      }
      });
  } else {
    //Añadimos layer temporal
    map.current.addSource("puntos", {
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
      id: "puntos",
      type: "line",
      source: "puntos",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#888",
        "line-width": 5,
      },
    });
  }
}

function setPointHTML(nombre,descripcion,categoria) {
  return '<p id="nombre">Nombre: ' +
  nombre +
  '<p id="descrip">Descripción: ' +
  descripcion +
  '</p><p id="tipo">Tipo: ' +
  categoria +
  '</p><a href="#" class="del"><img src="./images/bin.png" id="pencilpp" /></a> <a href="#" class="ed"><img src="./images/pencil.png" id="pencilpp" /></a> <a href="#" class="val"><img src="./images/star.png" id="pencilpp" /></a>';
}

function setFriendPointHTML(nombre,descripcion,categoria) {
  return '<p id="nombre">Nombre: ' +
  nombre +
  '<p id="descrip">Descripción: ' +
  descripcion +
  '</p><p id="tipo">Tipo: ' +
  categoria +
  '</p>';
}

function setEditHTML(nombre,descripcion,categoria) {
  return '<label for="name">Nombre:</label><input type="text" id="name" class="name" value="' +
          nombre + '"<label for="desc">Descripción:</label><input type="text" id="desc" class="desc" value="' + descripcion +
          '"/><label for="desc">Tipo:</label><select id="tipo">'+getOptionCategoria("Playa",categoria)+getOptionCategoria("Monumento",categoria)+
          getOptionCategoria("Restaurante",categoria)+getOptionCategoria("Otro",categoria)+ '</select><button href="#" class="guar">Guardar</button>'
}

function getOptionCategoria(categoria,actual) {
  if(categoria == actual) {
    return "<option value='"+categoria+"' selected>" + categoria + "</option>";
  } else {
    return "<option value='"+categoria+"'>" + categoria + "</option>";
  }
}

function addCategoria(categoria,marker) {
  switch (categoria) {
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
}

function removeCategoria(categoria,marker) {
  let cat;
  switch (categoria) {
    case "Playa":
      cat=playasMarks;
      break;
    case "Restaurante":
      cat=restaurantesMarks;
      break;
    case "Monumento":
      cat=monumentosMarks;
      break;
    default:
      cat=otrosMarks;
      break;
  }
  let index = cat.indexOf(marker);
  cat.splice(index, 1);
}

export default MapPage;