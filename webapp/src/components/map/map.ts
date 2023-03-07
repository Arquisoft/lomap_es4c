import mapboxgl, { Map } from "mapbox-gl";
import { mapAccessToken, mapStyleId } from "./data";

export const makeMap = (
  id: string | HTMLElement,
  center: [number, number],
  zoom: number
): Promise<Map> => {
  mapboxgl.accessToken = mapAccessToken;
  const map = new Map({
    container: id,
    center,
    zoom,
    style: `mapbox://styles/${mapStyleId}`,
  });

  var editing = false;

  //Añadir puntos al clickar
  map.on("click", function (e) {
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
        .addTo(map);
      let markerDiv = marker.getElement();

      popup.on("open", () => {
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
              '<label for="desc">Descripción:</label><input type="text" id="desc"  class="desc"><a href="#" class="aced">Guardar</a>'
            );
            popup
              .getElement()
              .getElementsByClassName("aced")[0]
              .addEventListener("click", () => {
                //Guardar los nuevos datos en el pod
                popup.setHTML(
                  "<p>" +
                    (document.getElementById("desc")! as HTMLInputElement)
                      .value +
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
    //TODO: guardarlos en el pod
  });

  //array.forEach(element => {
  //  let marker = new mapboxgl.Marker().setLngLat([element.get(0), element.get(0)]).addTo(map)
  //});

  //Mostrar descripcion al pasar raton
  //markerDiv.addEventListener('mouseenter', () => marker.togglePopup())
  //markerDiv.addEventListener('mouseleave', () => marker.togglePopup())

  //Botón edit
  const edit = document.getElementById("edit") as HTMLInputElement;
  edit.addEventListener("click", () => {
    editing = !editing;
    console.log(editing);
  });

  return new Promise((resolve) => {
    map.on("load", () => resolve(map));
  });
};
