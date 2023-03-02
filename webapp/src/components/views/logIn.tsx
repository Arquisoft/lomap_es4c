import React from "react";

import "./index.css";
import "./images/portada.png";
import "./images/uniovi.png";
function LogIn(): JSX.Element {
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
        <h1> Inicio de sesión </h1>
      </div>
      <div className="description">
        <form>
          <label id="userName">
            Nombre de usuario:
            <input type="text" name="userName" />
          </label>
          <label id="password">
            Contraseña:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Entrar" />
        </form>
      </div>
      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>
  );
}

export default LogIn;
