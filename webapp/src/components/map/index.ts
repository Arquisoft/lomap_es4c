import "mapbox-gl/dist/mapbox-gl.css";
import "./style.css";
import { center, zoom } from "./data";
import { makeMap } from "./map";

makeMap("app", center, zoom).then((map) => {
  console.log(map);
});
