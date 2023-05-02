import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState} from "react";

import { useNavigate } from 'react-router-dom';


function App(): JSX.Element {
    const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  //With this we can control the login status for solid
  const { session } = useSession();

  //We have logged in
  session.onLogin(()=>{
    setIsLoggedIn(true)
  })

  //We have logged out
  session.onLogout(()=>{
    setIsLoggedIn(false)
  })

  const callLogin = () => {
  
    // This will navigate to first component
    navigate('/login'); 
  };
  const callRegister = () => {
   
    window.location.replace('http://inrupt.net/register'); 
   
  };

  return (
    /*
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <LoginForm/> : <ProfileViewer/>}
    </SessionProvider>
    */
    
    <>
      <div className="App">
        <header>
          <p>LoMap</p>
          <nav>
          
            <button className="separador" onClick={callLogin}>Log in</button>
           <button onClick={callRegister}>Sign up</button>
          </nav>
        </header>
        
        <h1 id="title">LoMap</h1>
          <img id="portada" src="./images/portada.png" alt="portada" />
          
        
      
      <div className="description">
        <h2> Red social de mapas</h2>
        <p id="tras">
          {" "}
         Utilice esta aplicación para abrir su propio mapa y realice lo que usted quiera!
          desde añadir puntos de interés como restaurantes hasta crear su propia
          ruta y compartirla con sus amigos
        </p>
        </div>
      </div>
      <footer>
        <p id ="main">Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c</p>
      
      </footer>
    </>
    
  );
  
}

export default App;
