import { Session, fetch } from '@inrupt/solid-client-authn-browser';
import { MapMarker, MapMarkerReview, Comment, Maps, Location, Picture, ReviewScore, review } from '../shared/shareddtypes';
import { getFile, getDecimal, addIri, getStringNoLocale, saveFileInContainer, overwriteFile, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { Marker } from 'mapbox-gl';
import { v4 as uuidv4 } from 'uuid';
import {
	universalAccess
} from "@inrupt/solid-client";
import { Graph, WithContext, Person, Map, Place, Review, ImageObject } from 'schema-dts';
import { getPropertyForThing } from '@inrupt/solid-ui-react/dist/src/helpers';
import { permisosAccesoPod } from './permisos';
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
		identifier: uuidv4(),
		name: nombre,
		additionalType: tipo,
		latitude: lat,
		longitude: lon,
		description: descripc,
		review: [review],
		image: [image]

	};
	return place;
}



export async function addMarker(webid: string, nombre: string, lat: number, lon: number, tipo: string, idp: String, session: Session, descripc: string) {

	let marker = createPlaceObject(webid, nombre, lat, lon, tipo, descripc);
	addSolidMarker(session, idp, marker);
}

export async function addSolidMarker(session: Session, idp: String, newMarker: Place) {

	const webId = session.info.webId as string;
	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria

	let fileContent = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let text = await fileContent.text();
	let json = JSON.parse(text);
	json.spatialCoverage.push(newMarker);

	const blob = new Blob([JSON.stringify(json, null, 2)], {
		type: "application/ld+json",
	});
	const f = new File([blob], mapPointsUrl, { type: blob.type });

	await overwriteFile(
		mapPointsUrl,
		f,
		{ contentType: f.type, fetch: session.fetch as any }
	);
}



export async function removeMarker(webid: string, id: string, session: Session) {

	removeSolidMarker(webid, session, id);

}

export async function removeSolidMarker(webId: string, session: Session, markerId: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria

	let dataset = await getSolidDataset(mapPointsUrl);

	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);

	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length; i++) {
			if(json.spatialCoverage[i].identifier === markerId){
				json.spatialCoverage.splice(i, 1);
			}
		}
	}
	console.log(json.spatialCoverage)

	/*
	let punto = getThing(dataset, markerId) as Thing;
	var updatedDataset = removeThing(dataset, punto);
	console.log("dataset " + dataset.graphs);


	const updatedDatasetUrl = await saveSolidDatasetAt(mapPointsUrl, updatedDataset, { fetch: session.fetch as any });
	*/

	const blob = new Blob([JSON.stringify(json, null, 2)], {
		type: "application/ld+json",
	});
	const f = new File([blob], mapPointsUrl, { type: blob.type });

	await overwriteFile(
		mapPointsUrl,
		f,
		{ contentType: f.type, fetch: session.fetch as any }
	);

}

export async function updateMarkerReviews(session: Session, webId: string, markerId: string, coment: string, puntu: Number, imagen: Blob, pointName: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria


	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);

	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length; i++) {
			let punto = json.spatialCoverage[i];
			if (punto.identifier === markerId) {
				for (let j = 0; j < punto.review.length; j++) {
					if (punto.review.reviewBody === coment) {
						punto.review.revieBody = coment;
						punto.review.identifier = webId.replace("profile/card#me", "");
						punto.review.reviewRating.ratingValue = puntu;
						punto.review.reviewRating.datePublished = Date.now();
						punto.review.reviewRating.datePublished = Date.now();



					}
				}
				for (let j = 0; j < punto.image.length; j++) {
					if (punto.image.contentUrl === imagen) {
						punto.image.identifier = webId.replace("profile/card#me", "");
						punto.image.contentUrl = imagen;


						break;

					}
				}
			}
		}
	}

	const blob = new Blob([JSON.stringify(json, null, 2)], {
		type: "application/ld+json",
	});
	const f = new File([blob], mapPointsUrl, { type: blob.type });

	await overwriteFile(
		mapPointsUrl,
		f,
		{ contentType: f.type, fetch: session.fetch as any }
	);
}



export async function updateMarker(session: Session, webId: string, markerId: string, tipo: string, pointName: string, descripcion: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria


	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);

	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length; i++) {
			let punto = json.spatialCoverage[i];
			if (punto.identifier === markerId) {
				punto.name = pointName;
				punto.additionalType = tipo;
				punto.description = descripcion;
				break;
			}

		}


	}
	const blob = new Blob([JSON.stringify(json, null, 2)], {
		type: "application/ld+json",
	});
	const f = new File([blob], mapPointsUrl, { type: blob.type });

	await overwriteFile(
		mapPointsUrl,
		f,
		{ contentType: f.type, fetch: session.fetch as any }
	);
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

			let punto = json.spatialCoverage[i];
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
						markers[j] = getMarkers(session, profile).catch(e => console.log("No existe puntos para el amigo"));
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
		permisosPublico(mapPointsUrl, session);
	}
	catch{
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		permisosPublico(mapPointsUrl, session);


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
			identifier: uuidv4(),
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



		let mapa: WithContext<Map> = {
			"@context": "https://schema.org",
			'@type': 'Map',
			identifier: uuidv4(),
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


	}
}



export async function permisosPublico(url: string, session: Session) {
	universalAccess.setPublicAccess(
		url,
		{ read: true, write: false },    // Access object
		{ fetch: session.fetch as any }                 // fetch function from authenticated session
	).then((newAccess) => {
		if (newAccess === null) {
			console.log("Could not load access details for this Resource.");
		} else {
			console.log("Returned Public Access:: ", JSON.stringify(newAccess));

		}
	});
}