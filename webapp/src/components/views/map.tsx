import React from "react";

import "../../index.css";

function MapPage(): JSX.Element {
  return (
    <>
      <header>
        <p>LoMap</p>
        <nav>
          <button className="separador">ver perfil</button>
          <button>cerrar sesión</button>
        </nav>
      </header>
      <h1> Mapa </h1>
      <div id="app"></div>
      <a href="#" class="btn-flotante" id="edit">
        <img src="/src/pencil.png" id="pencil" />
      </a>
      <script src="src/components/index.ts"></script>

      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>
  );
}

export default MapPage;
