import "./styleProfile.css";
import { useSession, CombinedDataProvider, Image, Text } from "@inrupt/solid-ui-react";
import {  CardActionArea, CardContent, Typography } from "@material-ui/core";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";
import { useNavigate } from "react-router-dom";




function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { session } = useSession();
 



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

<div id ="profile" className ="profile">


{session.info.webId ? (
  <CombinedDataProvider 
    datasetUrl={session.info.webId} 
    thingUrl={session.info.webId}>
    <h1 id ="bienvenida"> Bienvenido/a<Text id="nombre" property={VCARD.fn.iri.value}> </Text> </h1>
    <CardActionArea style={{ justifyContent: "center", display: "flex" }}>
      <Image property={VCARD.hasPhoto.iri.value} id="imagen-perfil" width={480} />
    </CardActionArea>
    <CardContent>
      <Typography variant="body2" id="info" color="textSecondary" component="p" style={{ display: "block", alignItems: "left" }}>
       <p id="pinfo">Nombre:<Text className="info" property={FOAF.name.iri.value}> </Text> </p>
       <p id="pinfo">Organización:<Text className="info"  property={VCARD.organization_name.iri.value} /></p>
       <p id="pinfo">Dirección:<Text  className="info" property={VCARD.hasAddress.iri.value} /></p>
       <p id="pinfo">Email:<Text className="info" property={VCARD.hasEmail.iri.value} /></p>
       <p id="pinfo">Teléfono:<Text className="info" property={VCARD.hasTelephone.iri.value} /></p>
      </Typography>
    </CardContent>

    
  
</CombinedDataProvider>
): null }

</div>
</>
  
  );
}

export default Profile;