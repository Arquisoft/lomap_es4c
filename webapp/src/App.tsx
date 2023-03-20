import React from "react";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState} from "react";
import LoginForm from "./components/views/logIn"
import Main from "./components/views/main"
import ProfileViewer from "./components/views/profile"
import MapViewer from "./components/views/map"
import MapDiv from "./components/views/mapa"
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";


import "./index.css";
function callLogin(){
  console.log("Hola");
  
  
}

function App(): JSX.Element {
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



  return (
    
    <SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <LoginForm/> : <MapViewer/>}
    </SessionProvider>
    
    /*
    <>
      
          <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/profile" element={<ProfileViewer />}/>
            <Route path="/map" element={<MapViewer />}/>
            <Route path="/" element={<Main />}/>
          </Routes>
        </Router>
            
    </>
    */
  );
  
}

export default App;
