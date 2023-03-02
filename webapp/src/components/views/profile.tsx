import React from "react";

import "./index.css";

import "./images/uniovi.png";
import "./images/perfil.png";
function Profile(): JSX.Element {
  return (
    <>
      <div className="App">
        <header>
          <p>LoMap</p>
          <nav>
          <button className="separador">ver perfil</button>
          <button>cerrar sesión</button>
          </nav>
        </header>
        <div className = "perfil">
        <img src="./images/perfil.png" alt="foto perfil" />
        <h2 id = "name"> Nombre de usuario</h2>
  <h3 id = "complete"> Nombre completo : {}</h3>
  <h3 id = "email"> Correo electrónico : {}</h3>
    </div>
      </div>
      
      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>
  );
}

export default Profile;
