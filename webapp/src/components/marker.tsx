import { Session } from '@inrupt/solid-client-authn-browser';
import { MapMarker, MapMarkerReview } from '../shared/shareddtypes';
import { getStringNoLocale, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { Marker } from 'mapbox-gl';


export async function addMarker(webid: string,nombre: string, lat: Number, lon: Number, tipo: string, idp: String, session: Session) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

	var mapMarker: MapMarker = {
		webId: webid,
		id:"",
		titulo: nombre,
		latitud: lat,
		longitud:lon,
		categoria: tipo,
	};
	var marker = JSON.stringify({
		webId: mapMarker.webId,
		titulo: mapMarker.titulo
	});
	let response = await fetch(apiEndPoint + '/marker/add', {//En mongo solo guardamos webId y el titulo
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			marker
		})
	})

	console.log(response);
	//console.log(response.body?.getReader);
	//console.log(response.json());
	if (response.status == 200) {
		mapMarker.id=await response.json();
		addSolidMarker(session, idp,mapMarker);
		return true;
	} else {
		return false;
	}
}
export async function removeMarker(webid:string, id:string, session: Session) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'



	let response = await fetch(apiEndPoint + `/marker/${id.substring(id.lastIndexOf("#") + 1)}`, {//En mongo solo guardamos webId y el titulo
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})

	console.log(response);
	//console.log(response.body?.getReader);
	//console.log(response.json());
	if (response.status == 200) {

		removeSolidMarker(webid,session, id);
		return true;
	} else {
		return false;
	}
}

export async function removeSolidMarker(webId:string,session: Session,  markerId:string) {

	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria

	let dataset = await getSolidDataset(mapPointsUrl);



	let punto =  getThing(dataset,markerId) as Thing ;
	var updatedDataset = removeThing(dataset,punto);
	console.log("dataset " + dataset.graphs);


	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset,{fetch:session.fetch as any});

}

export async function updateMarkerReviews(session: Session, webId: string, markerId:string,des:string, coment:string, puntu:Number,imagen:Blob,pointName:string) {
	console.log("entro");
	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
	console.log("url ");
	console.log("marker ");
	let dataset = await getSolidDataset(mapPointsUrl);
	console.log("crea dataset");
	let punto =  getThing(dataset,markerId) as Thing ;
	console.log("Imagn " + imagen);

	var marker: MapMarkerReview = {
		webId: webId,
		id:markerId,//va todo la url
		descripcion:des,
		comentario:coment,
		puntuacion: puntu,
		imagen: imagen
	};

	let latitu = getUrl(punto, 'http://schema.org/latitude') as string;
	let longitu = getUrl(punto, 'http://schema.org/longitude') as string;
	let categoria = getUrl(punto, 'http://schema.org/category') as string;	
	latitu = latitu.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", "");
	longitu = longitu.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", "");
	//categoria = categoria.replace("http://www.w3.org/2001/XMLSchema#text(", "").replace(")", "");
	console.log("llega aqui 1");

	const url = URL.createObjectURL(marker.imagen);
	const img = document.createElement('img');
	img.src = url.replace("blob:", "");
	console.log("imagen 22222" + img.src);
	const mapPointsThing = buildThing(createThing(punto))
		.setUrl('http://schema.org/latitude', `http://www.w3.org/2001/XMLSchema#float(${latitu})`)
		.setUrl('http://schema.org/longitude', `http://www.w3.org/2001/XMLSchema#float(${longitu})`)
		//.setUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${categoria})`)
		.setUrl('http://schema.org/description', `http://www.w3.org/2001/XMLSchema#text(${marker.descripcion})`)
		.setUrl('http://schema.org/reviewAspect', `http://www.w3.org/2001/XMLSchema#text(${marker.comentario})`)
		.setUrl('http://schema.org/reviewRating', `http://www.w3.org/2001/XMLSchema#ratingValue(${marker.puntuacion})`)
		.setUrl('http://schema.org/image', `http://www.w3.org/2001/XMLSchema#imageObject(${img.src})`)
		.setStringNoLocale('http://schema.org/name', pointName)
		.build();

	// Añadir el punto de mapa al conjunto de datos
	var updatedDataset = setThing(dataset, mapPointsThing);
	console.log("dataset " + dataset.graphs);
	

	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset,{fetch:session.fetch as any});
	console.log(`El punto de mapa  has ido modificado'${pointName}'`);
}


export async function updateMarker(session: Session, webId: string, markerId:string, tipo: string, pointName:string) {
	console.log("entro");
	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
	
	let dataset = await getSolidDataset(mapPointsUrl);

	
	let punto =  getThing(dataset,markerId) as Thing ;


	let latitu = getUrl(punto, 'http://schema.org/latitude') as string;
	let longitu = getUrl(punto, 'http://schema.org/longitude') as string;	
	latitu = latitu.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", "");
	longitu = longitu.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", "");

	var marker: MapMarker = {
		webId: webId,
  		id:markerId,
		titulo: pointName,
  		latitud: parseFloat(latitu),
  		longitud: parseFloat(longitu),
  		categoria: tipo
	};

	const mapPointsThing = buildThing(createThing(punto))
		.setUrl('http://schema.org/latitude', `http://www.w3.org/2001/XMLSchema#float(${marker.latitud})`)
		.setUrl('http://schema.org/longitude', `http://www.w3.org/2001/XMLSchema#float(${marker.longitud})`)
		.setUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${marker.categoria})`)
		.setStringNoLocale('http://schema.org/name', pointName)
		.build();
	

	// Añadir el punto de mapa al conjunto de datos
	var updatedDataset = setThing(dataset, mapPointsThing);
	console.log("dataset " + dataset.graphs);

	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset,{fetch:session.fetch as any});
	console.log(`El punto de mapa  has ido modificado'${pointName}'`);
}
export async function addSolidMarker(session: Session, idp: String, marker: MapMarker) {
	const pointName = marker.titulo;
	const webId = marker.webId;


	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria

	const dataset = await getSolidDataset(mapPointsUrl).catch(error => console.error(error));;


	const newDataset = createSolidDataset();


	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);


	//const dataset = getSolidDatasetWithAcl();

	const mapPointsThing = buildThing(createThing({ name: marker.id }))
		//console.log("name " + pointName);
		//console.log("things " + mapPointsThing);
		// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
		.addUrl('http://schema.org/latitude', `http://www.w3.org/2001/XMLSchema#float(${marker.latitud})`)
		.addUrl('http://schema.org/longitude', `http://www.w3.org/2001/XMLSchema#float(${marker.longitud})`)
		.addUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${marker.categoria})`)
		.addStringNoLocale('http://schema.org/name', pointName)
		.build();

	var updatedDataset = null;
	// Añadir el punto de mapa al conjunto de datos
	if (dataset === undefined) {
		updatedDataset = setThing(newDataset, mapPointsThing);
	} else {
		updatedDataset = setThing(dataset, mapPointsThing);
		console.log("dataset " + dataset.graphs);
	}

	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, {fetch:session.fetch as any});
	console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl.graphs.url}`);
	return marker.id;
}

export async function getMarkers(session: Session,webId: String) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
			

		const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
		console.log("url12345678" + mapPointsUrl);
		const dataset = await getSolidDataset(mapPointsUrl,{fetch:session.fetch as any});
	
		var points = [];
	
		var arayThing=getThingAll(dataset);
		for(let i = 0; i < arayThing.length; i++){
			console.log("arayThing " + arayThing[i])
			let thi = arayThing[i] as Thing;
			console.log("thi " + thi.url);
			let nombre = getStringNoLocale(thi, "http://schema.org/name");
			let latitud = getUrl(thi, "http://schema.org/latitude") as String;
			let longitud = getUrl(thi, "http://schema.org/longitude") as String;
			let categoria = getUrl(thi, "http://schema.org/category") as String;
			if(categoria === null){
				categoria = "Otros";
			}
			//const descripcion = getUrl(thi, "http://schema.org/description");
			//console.log("nombre " + nombre);
			//console.log("latitud " + latitud.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", ""));
			//console.log("longitud " + longitud);
			//console.log("categoria " + categoria);
			var mark = [thi.url
				, nombre, latitud.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", ""), 
				longitud.replace("http://www.w3.org/2001/XMLSchema#float(", "").replace(")", ""), 
				categoria.replace("http://www.w3.org/2001/XMLSchema#text(", "").replace(")", ""), ];
			points.push(mark);
			//console.log("descripcion " + descripcion);
			//const titulo = (thi as Thing)["http://schema.org/latitude"];
			//const description = thing['http://schema.org/description'];
		  }
	/*
	  let response = await fetch(apiEndPoint + `/marker/user/${webId}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },

	})
	*/
	//console.log(response.json());
	return points;

}
export async function getMarker(id: String) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


	let response = await fetch(apiEndPoint + `/marker/${id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },

	})
	console.log(response.json());
	return await response.json();


}

export async function getFriendsSolid(webid: String, session: Session) {

	const dataset = await getSolidDataset(webid.toString());

	// Obtiene la cosa correspondiente al perfil FOAF
	var markers = [];
	var arayThing = getThingAll(dataset);
	for (let i = 0; i < arayThing.length; i++) {
		console.log("arayThing " + arayThing[i].url)
		// Obtiene el nombre completo del usuario
		var nombreCompleto = getUrlAll(arayThing[i], FOAF.knows.iri.value);

		console.log("Knows  " + nombreCompleto);
		if (arayThing[i].url.includes("card#me")) {
			var profiles = String(nombreCompleto).split(",");
			console.log("profiles " + profiles.length);
			
			for (let j = 0;j< profiles.length; j++) {
				if(!profiles[j].includes(webid.toString())){
				var profile=profiles[j]+"profile/";
				console.log("perfil "+profile);
				markers[j] = getMarkers(session, profile);
				console.log("MARKERS " + markers[j]);
				}

			}
		}
		//console.log(amigos[0]);



	}

	return markers;
}
