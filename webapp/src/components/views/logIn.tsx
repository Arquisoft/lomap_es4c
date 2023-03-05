import { useState, useEffect } from "react";
import { LoginButton } from "@inrupt/solid-ui-react";
import { Button, TextField, FormGroup, Container } from "@material-ui/core";


import React from "react";
function LogIn(): JSX.Element {

  const [idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

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
            <input type="password" name="name" />
          </label>
          <Container fixed>
          <FormGroup>
            <TextField
              label="Identity Provider"
              placeholder="Identity Provider"
              type="url"
              value={idp}
              onChange={(e) => setIdp(e.target.value)}
              InputProps={{
                endAdornment: (
                  <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                    <Button variant="contained" color="primary">
                      Login
                      </Button>
                  </LoginButton>
                ),
              }}
            />
          </FormGroup>
        </Container>
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
