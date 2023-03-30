
import { MapMarker } from '../shared/shareddtypes';
import {  createThing, setThing, addUrl,addStringNoLocale,getSolidDatasetWithAcl,saveSolidDatasetAt} from '@inrupt/solid-client';

class markerFunctionality {
	async addMarker(marker: MapMarker,idp:String) {
		const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


		let response = await fetch(apiEndPoint + '/marker/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ marker })
		})
		console.log(response.json());
		if (response.status == 200) {
			this.addSolidMarker(idp,await response.json());
			return true;
		} else {
			return false;
		}



	}
	async addSolidMarker(idp:String,marker: MapMarker) {

		const pointName = marker.titulo;
		const latitude = marker.latitud;
		const longitude = marker.longitud;
		const webId=marker.webId;
		
		const mapPointsUrl = idp+"/"+webId+'mapas/puntos.ttl';//proveedor+webId+nombreCategoria
		const dataset = await getSolidDatasetWithAcl(mapPointsUrl);
		
		const mapPointsThing = createThing({ name: pointName });
		
		// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
		addUrl(mapPointsThing, 'http://schema.org/latitude', `http://www.w3.org/2001/XMLSchema#float(${latitude})`);
		addUrl(mapPointsThing, 'http://schema.org/longitude', `http://www.w3.org/2001/XMLSchema#float(${longitude})`);
		addStringNoLocale(mapPointsThing, 'http://schema.org/name', pointName);
		
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
	async getMarker( id: String) {
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


