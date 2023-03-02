import React from "react";

import "./index.css";
import "./images/uniovi.png";

function SignUp(): JSX.Element {
  return (
    <>
      <div className="App">
        <header>
          
          <p>LoMap</p><nav>
          <button className="separador">log in</button>
          <button>sign up</button>
          </nav>
        </header>
        <h1> Registrarse </h1>
      </div>
      <div className="description">
        <form>
          <label id="name">
            Nombre:
            <input type="text" name="name" />
          </label>
          <label id="lastName">
            Apellidos :
            <input type="text" name="lastName" />
          </label>
          <label id="email">
            Correo :
            <input type="text" name="email" />
          </label>
          <label id="userName">
            Nombre de usuario :
            <input type="text" name="userName" />
          </label>
          <label id="password">
            Contraseña :
            <input type="text" name="password" />
          </label>
          <label id="repeatPassword">
            Repetir contraseña :
            <input type="text" name="repeatPassword" />
          </label>
          <input type="submit" value="Registrarse" />
        </form>
      </div>
      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
      
    </>
  );
}

export default SignUp;
