import React from "react";
import { useSession, CombinedDataProvider, Image, LogoutButton, Text } from "@inrupt/solid-ui-react";
import { Button, Card, CardActionArea, CardContent, Container, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { useNavigate, Navigate } from "react-router-dom";




function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();
  //console.log(session.info.webId);
  const logOut = () => {
    session.logout();
    navigate('/login'); 
   
  };
  const callMap = () => {
    navigate('/map'); 
  };
  return (
    <>
        <header>
        <p>LoMap</p>
        <nav>
        <button className="separador" onClick={callMap}>Mapa</button>
        <button onClick={logOut}>Cerrar sesión</button>
        
        </nav>
      </header>
      <h1> Datos del usuario</h1>
<div className ="profile">
      {session.info.webId ? (
        <CombinedDataProvider 
          datasetUrl={session.info.webId} 
          thingUrl={session.info.webId}>
        <Card style={{ maxWidth: 480 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              <Text property={FOAF.name.iri.value} />
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" style={{ display: "flex", alignItems: "center" }}>
              <Text property={VCARD.organization_name.iri.value} />
            </Typography>
          </CardContent>

          <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
            <Image property={VCARD.hasPhoto.iri.value} width={480} />
          </CardActionArea>
        </Card>
      </CombinedDataProvider>
      ): null }
    </div>
    </>
  );
}

export default Profile;
