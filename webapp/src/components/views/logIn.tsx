import { useState, useEffect } from "react";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { LoginButton } from "@inrupt/solid-ui-react";
import Select, { SelectChangeEvent} from "@mui/material/Select";
import { Button, Box,TextField, FormGroup, Container, MenuItem, InputLabel, FormControl } from "@material-ui/core";
import { login,handleIncomingRedirect,Session } from "@inrupt/solid-client-authn-browser";
import { useNavigate, Navigate } from 'react-router-dom';
import React from "react";




function LogIn(): JSX.Element {
 
  const [idp, setIdp] = useState("https://inrupt.net/");
  const navigate = useNavigate();
  const handleChange = (event: SelectChangeEvent) => {
    setIdp(event.target.value as string);
  };
  const [currentUrl, setCurrentUrl] = useState(window.location.href.replace("login", "profile"));
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // The default behavior of the button is to resubmit.
    // This prevents the page from reloading.
    e.preventDefault();
    // Login will redirect the user away so that they can log in the OIDC issuer,
    // and back to the provided redirect URL (which should be controlled by your app).
    
    login({
      redirectUrl: currentUrl, // we redirect to the actual page
      oidcIssuer: idp,
      clientName: "LoMap",
    });
   
  
  };
  const [oculto, setOculto] = useState(false);

  const [showText, setShowText] = useState(false);

  const handleButtonClick = () => {
    setOculto(true);
    setShowText(true);
  };
  const callRegister = () => {
   
    window.location.replace('http://inrupt.net/register'); 
   
  };
  

  return (
    <>
      <div className="App">
        <header>
          <p>LoMap</p>
          <nav>
            <button className="separador" >Log In</button>
            <button onClick={callRegister}>Sign up</button>
          </nav>
        </header>
        <h1> Inicio de sesión </h1>
        <p>inicie sesión para poder abrir un mapa.</p>
      </div>
      <div id="main">
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
          <div></div>
        
          
          
        </FormControl>
        <Button  disabled={idp === ""} variant="contained" color="primary"   type="submit">
              Login
            </Button>
        </Box>
        </Container>
      </div>
      <p id="main">Si no tiene una cuenta creada en Solid, clickee en sign up o en su defecto entre en login y créese una cuenta desde ahí</p>
      <div className="emergente">
     {!oculto &&<button className="fade-in" onClick={handleButtonClick}>
       ¿Qué es Solid?
      </button>}
      {showText && <p className="fade-in">Solid es un proyecto de descentralización de datos en la web. El objetivo principal de Solid es cambiar de 
      forma radical la manera en la que las aplicaciones web funcionan hoy en día, siendo el usuario quien 
      decide dónde almacenar sus datos, mejorando de esta forma la privacidad.
      Los usuarios pueden decidir dónde almacenar sus datos, incluyendo el control de acceso que estimen oportuno.</p>}
      </div>
    
    </>
  );
}

export default LogIn;
