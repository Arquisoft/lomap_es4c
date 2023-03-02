import React from "react";

import "./index.css";

function App(): JSX.Element {
  return (
    <>
      <div className="App">
        <header>
          <p>LoMap</p>
          <nav>
            <button className="separador">log in</button>
            <button>sign up</button>
          </nav>
        </header>
        <div className="portada">
          <img src="./images/portada.png" alt="portada" />
          <h1>LoMap</h1>
        </div>
      </div>
      <div className="description">
        <h2> Red social de mapas</h2>
        <p>
          {" "}
          seleccione el mapa que desee abrir y realice lo que usted quiera!
          desde añadir puntos de interés como restaurantes hasta crear su propia
          ruta y compartirla con sus amigos
        </p>
      </div>
      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="portada" />
      </footer>
    </>
  );
}

export default App;
