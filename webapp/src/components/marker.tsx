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
		descripcion:"",
		latitud: lat,
		longitud:lon,
		categoria: tipo,
		comentario: "",
		puntuacion: 0,
		imagen: ""
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

export async function updateMarker(session: Session, webId: string, markerId:string,des:string, categoria:string,coment:string, puntu:Number,imagen:string,pointName:string) {
	console.log("entro");
	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
	var marker: MapMarkerReview = {
		webId: webId,
		id:markerId,//va todo la url
		descripcion:des,
		categoria: categoria,
		comentario:coment,
		puntuacion: puntu,
		imagen: imagen
	};
	let dataset = await getSolidDataset(mapPointsUrl);

	let punto =  getThing(dataset,markerId) as Thing ;

	const mapPointsThing = setThing(dataset, buildThing(punto)
		.addUrl('http://schema.org/description', `http://www.w3.org/2001/XMLSchema#text(${marker.descripcion})`)
		.addUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${marker.categoria})`)
		.addUrl('http://schema.org/reviewAspect', `http://www.w3.org/2001/XMLSchema#text(${marker.comentario})`)
		.addUrl('http://schema.org/reviewRating', `http://www.w3.org/2001/XMLSchema#ratingValue(${marker.puntuacion})`)
		.addUrl('http://schema.org/image', `http://www.w3.org/2001/XMLSchema#imageObject(${marker.imagen})`)
		.addStringNoLocale('http://schema.org/name', pointName)
		.build());


	// Añadir el punto de mapa al conjunto de datos
	//var updatedDataset = setThing(dataset, mapPointsThing);
	//console.log("dataset " + dataset.graphs);


	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, mapPointsThing,{fetch:session.fetch as any});
	console.log(`El punto de mapa  has ido modificado'${pointName}'`);
}
export async function addSolidMarker(session: Session, idp: String, marker: MapMarker) {
	const pointName = marker.titulo;
	const webId = marker.webId;
	console.log("marker " + marker.descripcion);

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

/*

class markerFunctionality {

	constructor() {
	}

	async addMarker(webid: string, nombre: string, x: Number, y: Number, tipo: string, idp: String) {
		const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

		var marker: MapMarker = {
			webId: webid,
			
			titulo: nombre,
			descripcion: "",
			latitud: x,
			longitud: y,
			categoria: tipo,
			comentario: "Preuba",
			puntuacion: 0,
			imagen: "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII="
		};

		let response = await fetch(apiEndPoint + '/marker/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ marker })
		})
		console.log(response.json());
		if (response.status == 200) {
			this.addSolidMarker(idp, await response.json());
			return true;
		} else {
			return false;
		}



	}
	async addSolidMarker(idp: String, marker: MapMarker) {

		const pointName = marker.titulo;
		const latitude = marker.latitud;
		const longitude = marker.longitud;
		const webId = marker.webId;

		const mapPointsUrl = idp + "/" + webId + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
		const dataset = await getSolidDatasetWithAcl(mapPointsUrl);

		const mapPointsThing = createThing({ name: pointName });

		// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
		addUrl(mapPointsThing, 'http://schema.org/latitude', `http://www.w3.org/2001/XMLSchema#float(${latitude})`);
		addUrl(mapPointsThing, 'http://schema.org/longitude', `http://www.w3.org/2001/XMLSchema#float(${longitude})`);
		addStringNoLocale(mapPointsThing, 'http://schema.org/name', "pointName");

		// Añadir el punto de mapa al conjunto de datos
		const updatedDataset = setThing(dataset, mapPointsThing);

		// Escribir el conjunto de datos actualizado en el Pod de Solid
		const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset);

		console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl}`);
	}

	async getMarkers(webId: String) {
		const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


		let response = await fetch(apiEndPoint + `/marker/user/${webId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },

		})
		console.log(response.json());


		return await response.json()


	}
	async getMarker(id: String) {
		const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


		let response = await fetch(apiEndPoint + `/marker/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },

		})
		console.log(response.json());
		return await response.json();


	}
}
export default markerFunctionality;

*/