import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import Select, { SelectChangeEvent} from "@mui/material/Select";
import { Button, Box,TextField, FormGroup, Container, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { login,handleIncomingRedirect,Session } from "@inrupt/solid-client-authn-browser";


import React from "react";

function LogIn(): JSX.Element {
 
  const [idp, setIdp] = useState("https://inrupt.net/");
  const handleChange = (event: SelectChangeEvent) => {
    setIdp(event.target.value as string);
  };
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000/profile");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // The default behavior of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    // Login will redirect the user away so that they can log in the OIDC issuer,
    // and back to the provided redirect URL (which should be controlled by your app).
    //const { session } = useSession();
    
   //window.localStorage.setItem("KEY_CURRENT_SESSION", session.info.webId===undefined?"g":session.info.webId);
    login({
      redirectUrl: currentUrl, // we redirect to the actual page
      oidcIssuer: idp,
      clientName: "LoMap",
    });
  };
 
 
/*

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);
*/
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
    <Container>
    <Box
          component="form"
          onSubmit={handleSubmit}
        
          sx={{ mt: 3, minWidth: 200 }}
        >
        <FormControl fullWidth>
          <InputLabel id="proveedor-pod-label">Seleccione el proveedor</InputLabel>
          <Select
            labelId="proveedor-pod-label"
            id="proveedor-pod"
            value={idp}
            label="Seleccione el proveedor"
            onChange={handleChange}
          >
            <MenuItem value={"https://inrupt.net/"}>Inrupt.net</MenuItem>
            <MenuItem value={"https://solidcommunity.net/"}>Solid Community.net</MenuItem>
            <MenuItem value={"https://solidweb.me/"}>Solidweb.me</MenuItem>
          </Select>
          
        

          
          
          
        </FormControl>
        <Button  disabled={idp === ""} variant="contained" color="primary"   type="submit">
              Login
            </Button>
        </Box>
        </Container>
      </div>
      <footer>
        <p>Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
        <img src="./images/uniovi.png" alt="uniovi" />
      </footer>
    </>
  );
}

export default LogIn;
