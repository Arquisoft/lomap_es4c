import { Session, fetch } from '@inrupt/solid-client-authn-browser';
import { MapMarker, MapMarkerReview, Comment, Maps,Location, Picture, ReviewScore } from '../shared/shareddtypes';
import { getDecimal, getStringNoLocale, overwriteFile, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { Marker } from 'mapbox-gl';
import { Console, timeStamp } from 'console';




export async function addMarker(webid: string, nombre: string, lat: Number, lon: Number, tipo: string, idp: String, session: Session, descripc: string) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


	var comentario: Comment = {
		author: "",
		comment: "",
		date: ""
	};
	var review: ReviewScore = {
		author: "",
		score: 0,
		date: Date.now()

	};
	var picture: Picture = {
		author: "",
		pictureUrl: "",
		date: Date.now()

	};

	var comments: Comment[] = [];
	comments.push(comentario);

	var reviews: ReviewScore[] = [];
	reviews.push(review);

	var pictures: Picture[] = [];
	pictures.push(picture);




	var location: Location = {
		id: Math.random().toString(),
		name: nombre,
		category: tipo,
		description: "",
		latitude: lat,
		longitude: lon,
		comments: comments,
		reviewScores: reviews,
		pictures: pictures

	};
	var mapMarker: MapMarker = {
		id: Math.random().toString(),
		name: "Mapa",
		author: nombre,
		locations: location
	};
	var mapMarkers: MapMarker[] = [];
	mapMarkers.push(mapMarker);

	var map: Maps={
		
		maps:mapMarkers
	}


	var marker = JSON.stringify({
		webId: webid,
		titulo: nombre
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
		mapMarker.id = await response.json();
		addSolidMarker(session, idp, map);
		return true;
	} else {
		return false;
	}
}
export async function removeMarker(webid: string, id: string, session: Session) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'



	let response = await fetch(apiEndPoint + `/marker/${id.substring(id.lastIndexOf("#") + 1)}`, {//En mongo solo guardamos webId y el titulo
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	})

	console.log(response);
	//console.log(response.body?.getReader);
	//console.log(response.json());
	if (response.status == 200) {

		removeSolidMarker(webid, session, id);
		return true;
	} else {
		return false;
	}
}

export async function removeSolidMarker(webId: string, session: Session, markerId: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria

	let dataset = await getSolidDataset(mapPointsUrl);



	let punto = getThing(dataset, markerId) as Thing;
	var updatedDataset = removeThing(dataset, punto);
	console.log("dataset " + dataset.graphs);


	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });

}

export async function updateMarkerReviews(session: Session, webId: string, markerId: string, coment: string, puntu: Number, imagen: Blob, pointName: string) {
	console.log("entro");
	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	console.log("url ");
	console.log("marker ");
	let dataset = await getSolidDataset(mapPointsUrl);
	console.log("crea dataset");
	let punto = getThing(dataset, markerId) as Thing;
	console.log("Imagn " + imagen);

	var marker: MapMarkerReview = {
		webId: webId,
		id: markerId,//va todo la url
		comentario: coment,
		puntuacion: puntu,
		imagen: imagen
	};

	let lat = getDecimal(punto, 'https://schema.org/latitude') as number;
	let lon = getDecimal(punto, 'https://schema.org/longitude') as number;
	let descripcion = getStringNoLocale(punto, 'https://schema.org/description') as string;

	console.log("llega aqui 1");

	const url = URL.createObjectURL(marker.imagen);
	const img = document.createElement('img');
	img.src = url.replace("blob:", "");
	console.log("imagen 22222" + img.src);
	const mapPointsThing = buildThing(createThing(punto))
		.setDecimal('https://schema.org/latitude', lat)
		.setDecimal('https://schema.org/longitude', lon)
		.setStringNoLocale('https://schema.org/description', `${descripcion}`)
		.setStringNoLocale('https://schema.org/reviewAspect', `${marker.comentario}`)
		.setDecimal('https://schema.org/reviewRating', marker.puntuacion as number)
		.setUrl('https://schema.org/image', `${img.src}`)
		.setStringNoLocale('http://schema.org/name', pointName)
		.build();

	// Añadir el punto de mapa al conjunto de datos
	var updatedDataset = setThing(dataset, mapPointsThing);
	console.log("dataset " + dataset.graphs);


	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });
	console.log(`El punto de mapa  has ido modificado'${pointName}'`);
}


export async function updateMarker(session: Session, webId: string, markerId:string, tipo: string, pointName:string, descripcion:string) {
	console.log("entro");
	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	/*
	let dataset = await getSolidDataset(mapPointsUrl);


	let punto = getThing(dataset, markerId) as Thing;


	let latitu = getDecimal(punto, 'https://schema.org/latitude') as number;
	let longitu = getDecimal(punto, 'https://schema.org/longitude') as number;	

	var marker: MapMarker = {
		webId: webId,
		id: markerId,
		titulo: pointName,
		descripcion: descripcion,
			latitud: latitu,
			longitud: longitu,
			categoria: tipo
	};

	const mapPointsThing = buildThing(createThing(punto))
		.setDecimal('https://schema.org/latitude', marker.latitud as number)
		.setDecimal('https://schema.org/longitude', marker.longitud as number)
		.setStringNoLocale('https://schema.org/category', `${marker.categoria}`)
		.setStringNoLocale('https://schema.org/description', `${marker.descripcion}`)
		.setStringNoLocale('https://schema.org/name', pointName)
		.build();


	// Añadir el punto de mapa al conjunto de datos
	var updatedDataset = setThing(dataset, mapPointsThing);
	console.log("dataset " + dataset.graphs);

	// Escribir el conjunto de datos actualizado en el Pod de Solid
	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });*/
	console.log(`El punto de mapa  has ido modificado'${pointName}'`);
}
export async function addSolidMarker(session: Session, idp: String, marker: Maps) {
	const pointName = 'Prueba';
	const webId = session.info.webId as string;

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map/';//proveedor+webId+nombreCategoria
	//const dataset = await getSolidDataset(mapPointsUrl).catch(error => console.error(error));;
	//const newDataset = createSolidDataset();

	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);

	//const dataset = getSolidDatasetWithAcl();
	/*	
		const mapPointsThing = buildThing(createThing({ name: marker.id }))
			//console.log("name " + pointName);
			//console.log("things " + mapPointsThing);
			// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
			.addDecimal('https://schema.org/latitude', marker.latitud as number)
			.addDecimal('https://schema.org/longitude', marker.longitud as number)
			.addStringNoLocale('https://schema.org/category', `${marker.categoria}`)
			.addStringNoLocale('https://schema.org/description', `${marker.descripcion}`)
			.addStringNoLocale('https://schema.org/name', pointName)
			.build();
	
	var file = overwriteFile(
		mapPointsUrl + marker.name + '.json',
		new Blob([
			JSON.stringify(marker),
		]),);s
	console.log(file);
*/
var punto = marker.maps[0]
	/*const savedFile = await overwriteFile(
		mapPointsUrl + punto.name,
			new new Blob([JSON.stringify(marker)], { type: "application/json" }),
		{ contentType: "application/json", fetch: fetch }
	  );
*/







	  let blob = new Blob([JSON.stringify(marker)], { type: "application/json" });
	  let file = new File([blob], punto.name + ".json", { type: blob.type });

	  await overwriteFile(
		mapPointsUrl + punto.name,
		  file,
		  { contentType: file.type, fetch: session.fetch }
	  );
	
	// Escribir el conjunto de datos actualizado en el Pod de Solid
	//const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });
	//console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl.graphs.url}`);
	return punto.id;
}


export async function getMarkers(session: Session, webId: String) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	console.log("url12345678 " + mapPointsUrl);
	console.log("session sbkd" + session.fetch);
	const dataset = await getSolidDataset(mapPointsUrl, { fetch: session.fetch as any }).catch(error => console.log("error " + error));

	console.log("dataset aaaaaaaaaaaaa " + dataset);
	var points = [];
	if (dataset !== undefined) {
		var arayThing = getThingAll(dataset);
		for (let i = 0; i < arayThing.length; i++) {
			try {
				console.log("arayThing " + arayThing[i])
				let thi = arayThing[i] as Thing;
				console.log("thi " + thi.url);
				let nombre = getStringNoLocale(thi, "https://schema.org/name");
				let latitud = getDecimal(thi, "https://schema.org/latitude") as number;
				let longitud = getDecimal(thi, "https://schema.org/longitude") as number;
				let categoria = getStringNoLocale(thi, "https://schema.org/category") as String;
				let descripcion = getStringNoLocale(thi, "https://schema.org/description") as String;
				if (categoria === null) {
					categoria = "Otros";
				}
				var mark = [thi.url
					, nombre,
					latitud,
					longitud,
					categoria,
					descripcion];
				points.push(mark);
			} catch (error) {
				console.log("Se ha producido un error buscando un marker");
			}

		}

	}
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

			for (let j = 0; j < profiles.length; j++) {
				if (!profiles[j].includes(webid.toString())) {
					var profile = profiles[j];
					console.log("perfil " + profile);
					try {
						markers[j] = getMarkers(session, profile);
					} catch (error) {
						console.log("No existe puntos para el amigo " + profile);
					}
					console.log("MARKERS " + markers[j]);
				}
			}
		}
	}

	return markers;
}