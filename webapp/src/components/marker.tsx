import { Session, fetch } from '@inrupt/solid-client-authn-browser';
import { MapMarker, MapMarkerReview, Comment, Maps, Location, Picture, ReviewScore, review } from '../shared/shareddtypes';
import { getFile, getDecimal, addIri, getStringNoLocale, saveFileInContainer, overwriteFile, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { Marker } from 'mapbox-gl';
import { Console, timeStamp } from 'console';
import { Graph, WithContext, Person, Map, Place, Review, ImageObject } from 'schema-dts';
import { getPropertyForThing } from '@inrupt/solid-ui-react/dist/src/helpers';

/**
 * Devulev eun objeto Plaes para añadir al mapa
 */
export function createPlaceObject(webid: string, nombre: string, lat: number, lon: number, tipo: string, descripc: string) {

	let review: Review = {
		'@type': 'Review',
		author: {
			'@type': 'Person',
			identifier: '',
		},
		reviewRating: {
			'@type': 'Rating',
			ratingValue: ""
		},
		datePublished: '',
		reviewBody: ''

	};
	let image: ImageObject = {


		'@type': 'ImageObject',
		author: {
			'@type': 'Person',
			identifier: '',
		},
		contentUrl: ""

	};

	let place: Place = {
		'@type': 'Place',
		identifier: '1549487',
		name: nombre,
		additionalType: tipo,
		latitude: lat,
		longitude: lon,
		description: descripc,
		review: [review, review],
		image: [image]

	};
	return place;
}



export async function addMarker(webid: string, nombre: string, lat: number, lon: number, tipo: string, idp: String, session: Session, descripc: string) {
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


	var locations: Location[] = [];

	var location: Location = {
		id: "234687909ygfjgcbgt543w5e",
		name: nombre,
		category: tipo,
		description: "",
		latitude: lat as number,
		longitude: lon as number,
		comments: comments,
		reviewScores: reviews,
		pictures: pictures

	};
	locations.push(location);
	var mapMarker: MapMarker = {
		id: Math.random().toString(),
		name: "MapPrueba2",
		author: nombre,
		locations: locations
	};
	var mapMarkers: MapMarker[] = [];
	mapMarkers.push(mapMarker);

	var map: Maps = {
		maps: mapMarkers
	}

	var newMarker: Place = {
		'@type': 'Place',
		identifier: 'y54xwevu75r865e65e64e',
		name: nombre,
		additionalType: tipo,
		latitude: lat,
		longitude: lon,
		description: descripc,
		review: [],
		image: []

	};


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
		addSolidMarker(session, idp, newMarker);
		return true;
	} else {
		return false;
	}
}

export async function addSolidMarker(session: Session, idp: String, newMarker: Place) {
	//const pointName = 'Prueba';
	const webId = session.info.webId as string;

	//var punto = marker.maps[0];

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	//const dataset = await getSolidDataset(mapPointsUrl).catch(error => console.error(error));;
	//const newDataset = createSolidDataset();

	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);
	

	let fileContent = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let text = await fileContent.text();
	//let file = new File([fileContent], "Map.json", { type: "application/json" });
	let json = JSON.parse(text);



	console.log("json " + json);
	console.log("json spatial " + json);
	json.spatialCoverage.push(newMarker);
	//json.spatialCoverage.push(newMarker);
	const blob = new Blob([JSON.stringify(json, null, 2)], {
		type: "application/ld+json",
	});
	const f = new File([blob], mapPointsUrl, { type: blob.type });

	await overwriteFile(
		mapPointsUrl,
		f,
		{ contentType: f.type, fetch: session.fetch as any }
	);
	//const newDataset = createSolidDataset();





	//const dataset = getSolidDatasetWithAcl();
	//console.log(punto.locations[0].id);
	/*
		const mapPointsThing = buildThing(createThing({ name: punto.locations[0].id }))
			//console.log("name " + pointName);
			//console.log("things " + mapPointsThing);
			// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
			.addDecimal('http://schema.org/latitude', punto.locations[0].latitude)
			.addDecimal('http://schema.org/longitude', punto.locations[0].longitude)
			.addStringNoLocale('http://schema.org/category', punto.locations[0].category)
			.addStringNoLocale('http://schema.org/name', pointName)
			.build();
	
	const mapPointsThing = buildThing(createThing({ name: "mapa" })).addUrlAll()
		var updatedDataset = null;
		// Añadir el punto de mapa al conjunto de datos
		if (dataset === undefined) {
			updatedDataset = setThing(newDataset, place);
		} else {
			updatedDataset = setThing(dataset, mapPointsThing);
			console.log("dataset " + dataset.graphs);
		}
	
		// Escribir el conjunto de datos actualizado en el Pod de Solid
		const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, {fetch:session.fetch as any});
		console.log(`El punto de mapa '${pointName}' se ha añadido al Pod de Solid en la URL ${updatedDatasetUrl.graphs.url}`);
		*/
	//return newMarker.valueOf();
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


export async function updateMarker(session: Session, webId: string, markerId: string, tipo: string, pointName: string, descripcion: string) {
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


export async function getMarkers(session: Session, webId: String) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria

	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);
	var points = [];
	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length; i++) {

			let punto = json.spatialCoverage[0];
			var mark = [punto.identifier
				, punto.name,
			punto.latitude,
			punto.longitude,
			punto.additionalType,
			punto.description];
			points.push(mark);

		}
		return points;
	}
	return [];
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


export async function createMap(mapName: string, session: Session, webId: string) {
	try {
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		const dataset = await getSolidDataset(mapPointsUrl, { fetch: session.fetch as any });
	}
	catch (error) {
		console.log("No existe el mapa");
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		const dataset = await createSolidDataset();

		let map: MapMarker = {
			id: "12345657635452674u5u4yt3yu65",
			name: mapName,
			author: webId,
			locations: []
		}/*

		let place: Graph = {
			'@context': 'https://schema.org',
			"@graph": [
				{
					"@type": "Map",
					"@id": "lom:0",
					"author": {
						"@type": "Person",
						"identifier": "https://raulalv.inrupt.net/profile/card#me"
					},
					"name": "Map",
					"spatialCoverage": {
						"@id": "lom:9eb0b0ef-df83-4662-9daa-608d64727050"
					}
				}

			]
		};
*/
		let review: Review = {
			'@type': 'Review',
			author: {
				'@type': 'Person',
				identifier: '',
			},
			reviewRating: {
				'@type': 'Rating',
				ratingValue: ""
			},
			datePublished: '',
			reviewBody: ''

		};
		let image: ImageObject = {


			'@type': 'ImageObject',
			author: {
				'@type': 'Person',
				identifier: '',
			},
			contentUrl: ""

		};

		let place: Place = {
			'@type': 'Place',
			identifier: '124894891519',
			name: 'Barajas',
			additionalType: '',
			latitude: 0,
			longitude: 0,
			description: '',
			review: [review, review],
			image: [image]

		};
		var colectionPuntos: Place[] = [];
		colectionPuntos.push(place);

		let punto: Graph = {
			'@context': 'https://schema.org',
			'@graph': colectionPuntos
		};

		punto['@graph'].forEach(p => console.log("Punto" + p as Place));




		let mapa: WithContext<Map> = {
			"@context": "https://schema.org",
			'@type': 'Map',
			identifier: '1234872597vdfg78784',
			name: 'Mapa',
			author: {
				'@type': 'Person',
				identifier: webId,
			},
			spatialCoverage: colectionPuntos

		};






		let blob = new Blob([JSON.stringify(mapa)], { type: "application/ld+json" });
		let file = new File([blob], 'mapa' + ".jsonld", { type: blob.type });

		await overwriteFile(
			mapPointsUrl,
			file,
			{ contentType: file.type, fetch: session.fetch as any }
		);




		//let updatedDataset = setThing(dataset, newBookThing1);
		//	const savedDataset = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any })

		/*
				let blob = new Blob([JSON.stringify(mapa)], { type: "application/ld+json" });
				console.log("blob " + mapPointsUrl);
				let file = new File([blob], "map" + ".jsonld", { type: blob.type });
		
		
		
				await overwriteFile(
					mapPointsUrl,
					blob,
					{ contentType: blob.type, fetch: session.fetch as any }
				);
		*/
		//const savedDataset = await saveSolidDatasetAt(mapPointsUrl, dataset, { fetch: session.fetch as any });
		/*
		const mapPointsThing = buildThing(createThing(map))
		.addStringNoLocale('https://schema.org/identifier', map.id)	
		.addStringNoLocale('https://schema.org/name', map.name)
		.addStringNoLocale('https://schema.org/author', map.author)
		.build();
		*/


	}


}