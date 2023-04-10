
import { Session } from '@inrupt/solid-client-authn-browser';
import { MapMarker,MapMarkerReview } from '../shared/shareddtypes';
import { buildThing, getSolidDataset, createSolidDataset, createThing,Thing, setThing,getThing, getThingAll,addUrl, addStringNoLocale, getSolidDatasetWithAcl,getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';



export async function addMarker(webid: string,nombre: string, lat: Number, lon: Number, tipo: string, idp: String, session: Session) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

	var marker: MapMarker = {
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
	
	let response = await fetch(apiEndPoint + '/marker/add', {//En mongo solo guardamos webId y el titulo
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			webId: marker.webId,
			titulo: marker.titulo
		})
	})
	var prueba = JSON.stringify({
		webId: webid,
		titulo: nombre
	});
	console.log(response);
	//console.log(response.body?.getReader);
	//console.log(response.json());
	if (response.status == 200) {
		marker.id=await response.json();
		addSolidMarker(session, idp,marker);
		return true;
	} else {
		return false;
	}
}

export async function updateMarker(session: Session, idp: String, marker: MapMarkerReview) {
	
	const webId = marker.webId;
	console.log("marker " + marker.descripcion);
	var markerId="";
	var pointName="";
	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria

	let dataset = await getSolidDataset(mapPointsUrl);
	let url=mapPointsUrl+markerId;
	
	let punto =  getThing(dataset,url) as Thing ;

	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);

	

	const mapPointsThing = buildThing(punto)
		.addUrl('http://schema.org/description', `http://www.w3.org/2001/XMLSchema#text(${marker.descripcion})`)
		.addUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${marker.categoria})`)
		.addUrl('http://schema.org/reviewAspect', `http://www.w3.org/2001/XMLSchema#text(${marker.comentario})`)
		.addUrl('http://schema.org/reviewRating', `http://www.w3.org/2001/XMLSchema#number(${marker.puntuacion})`)
		.addUrl('http://schema.org/image', `http://www.w3.org/2001/XMLSchema#imageObject(${marker.imagen})`)
		.addStringNoLocale('http://schema.org/name', pointName)
		.build();
  

	// Añadir el punto de mapa al conjunto de datos
		var updatedDataset = setThing(dataset, mapPointsThing);
		console.log("dataset " + dataset.graphs);
	

	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: fetch });
	console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl.graphs.url}`);
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
		.addUrl('http://schema.org/description', `http://www.w3.org/2001/XMLSchema#text(${marker.descripcion})`)
		.addUrl('http://schema.org/category', `http://www.w3.org/2001/XMLSchema#text(${marker.categoria})`)
		.addUrl('http://schema.org/reviewAspect', `http://www.w3.org/2001/XMLSchema#text(${marker.comentario})`)
		.addUrl('http://schema.org/reviewRating', `http://www.w3.org/2001/XMLSchema#number(${marker.puntuacion})`)
		.addUrl('http://schema.org/image', `http://www.w3.org/2001/XMLSchema#imageObject(${marker.imagen})`)
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
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });
	console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl.graphs.url}`);
}

export async function getMarkers(session: Session,webId: String) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'

	const mapPointsUrl = webId.replace("card#me", "") + 'mapas/puntos.ttl';//proveedor+webId+nombreCategoria

	const dataset = await getSolidDataset(mapPointsUrl,{fetch:fetch});

	var arayThing=getThingAll(dataset);
	for(let i = 0; i < arayThing.length; i++){
		let thing = arayThing[i];
		//const titulo = thing['http://schema.org/latitude'];
		///const description = thing['http://schema.org/description'];
	  }
	let response = await fetch(apiEndPoint + `/marker/user/${webId}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },

	})
	console.log(response.json());


	return await response.json()


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
