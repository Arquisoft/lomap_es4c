import React from "react";
import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import { useState,useEffect} from "react";
import LoginForm from "./components/views/logIn"
import Main from "./components/views/main"
import ProfileViewer from "./components/views/profile"
import MapViewer from "./components/views/map"
import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
  import { login,handleIncomingRedirect, onSessionRestore} from "@inrupt/solid-client-authn-browser";


import "./index.css";
function callLogin(){
  console.log("Hola");
  
  
}
/*
const router = useRouter();

// 1. Register the callback to restore the user's page after refresh and
//    redirection from the Solid Identity Provider.
onSessionRestore((url) => {
  router.push(url)
});

useEffect(() => {
  // 2. When loading the component, call `handleIncomingRedirect` to authenticate
  //    the user if appropriate, or to restore a previous session.
  handleIncomingRedirect({
    restorePreviousSession: true
  }).then((info) => {
    console.log(`Logged in with WebID [${info.webId}]`)
  })
}, []);
*/

function App(): JSX.Element {
 /* const [isLoggedIn, setIsLoggedIn] = useState(false);

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
*/const [webId, setwebId] = useState("");

  
  return (
    
    /*<SessionProvider sessionId="log-in-example">
      {(!isLoggedIn) ? <LoginForm/> : <MapViewer/>}
    </SessionProvider>
    */
    
    <>
     
          <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />}/>
            <Route path="/profile" element={<ProfileViewer/>}/>
            <Route path="/map" element={<MapViewer/>}/>
            <Route path="/" element={<Main />}/>
          </Routes>
        </Router>
        
    </>
  
  );
  
}

export default App;
