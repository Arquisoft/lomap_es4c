import { Session } from '@inrupt/solid-client-authn-browser';
import { getFile, overwriteFile, getUrlAll, getSolidDataset, Thing, getThing } from '@inrupt/solid-client';
import { v4 as uuidv4 } from 'uuid';
import {universalAccess} from "@inrupt/solid-client";
import { Graph, WithContext, Person, Map, Place, Review, ImageObject } from 'schema-dts';

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
		review: [],
		image: []

	};
	return place;
}



export async function addMarker(webid: string, nombre: string, lat: number, lon: number, tipo: string, idp: String, session: Session, descripc: string) {

	let marker = createPlaceObject(webid, nombre, lat, lon, tipo, descripc);
	addSolidMarker(session, idp, marker).catch(e => console.log(e));
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

	removeSolidMarker(webid, session, id).catch(e => console.log(e));

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
			if (json.spatialCoverage[i].identifier === markerId) {
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
export function createReviewObject(webId: string, coment: string, puntu: number) {

	let review: Review = {
		'@type': 'Review',
		author: {
			'@type': 'Person',
			identifier: webId.replace("profile/card#me", ""),
		},
		reviewRating: {
			'@type': 'Rating',
			ratingValue: puntu
		},
		datePublished: new Date().toDateString(),
		reviewBody: coment

	};
	return review;
}
export function createImageObject(webId: string, imagen: string) {
	let image: ImageObject = {


		'@type': 'ImageObject',
		author: {
			'@type': 'Person',
			identifier: webId.replace("profile/card#me", ""),
		},
		contentUrl: imagen

	};
	return image;
}



export async function updateMarkerReviews(session: Session, webId: string, markerId: string, coment: string, puntu: number, imagen: string, pointName: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria


	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = await JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);
	let flag = true;

	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length && flag; i++) {
			let punto = json.spatialCoverage[i];
			if (punto.identifier === markerId) {
				flag = false;
				punto.review[0] = createReviewObject(webId, coment, puntu);

				punto.image[0] = createImageObject(webId, imagen);
				json.spatialCoverage[i] = punto;

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

export async function getMarkersReview(session: Session, webId: String, markerId: string) {

	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria

	const fileBlob = await getFile(mapPointsUrl, { fetch: session.fetch as any });
	let jsonStringFy = JSON.stringify(await fileBlob.text());
	let jsonMarkers = JSON.parse(jsonStringFy);
	let json = JSON.parse(jsonMarkers);
	var review;
	let flag = true;
	if (json.spatialCoverage.length !== undefined) {
		for (let i = 0; i < json.spatialCoverage.length && flag; i++) {
			let punto = json.spatialCoverage[i];
			if (punto.identifier === markerId) {
				flag = false;
				let punto = json.spatialCoverage[i];
				 review = [markerId,
					punto.review[0].author.identifier
					, punto.review[0].reviewBody,
					punto.review[0].reviewRating.ratingValue,
					punto.image[0].contentUrl];

				
				break;


			}

		}

	}
	return review;
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
	const perfil = getThing(dataset, webid.toString()) as Thing;
	const knows = getUrlAll(perfil, "http://xmlns.com/foaf/0.1/knows");
	var markers = [];
	if (knows !== undefined) {
		var profiles = String(knows).split(",");
		for (let j = 0; j < profiles.length; j++) {
			console.log("PERRFIL**************** " + profiles);
			if (!profiles[j].includes(webid.toString())) {
				var profile = profiles[j];
				try {
					markers[j] = await getMarkers(session, profile).catch(e => console.log("No existe puntos para el amigo"));
				} catch (error) {
					console.log("No existe puntos para el amigo " + profile);
				}
				console.log("MARKERS " + markers[j]);
			}
		}
	}

	return markers;
}



export async function createMap(mapName: string, session: Session, webId: string) {
	try {
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		const dataset = await getSolidDataset(mapPointsUrl, { fetch: session.fetch as any });
		await permisosPublico(mapPointsUrl, session);
	}
	catch {
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap';//proveedor+webId+nombreCategoria



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
			name: 'Punto de ejemplo',
			additionalType: '',
			latitude: 0,
			longitude: 0,
			description: '',
			review: [],
			image: []

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
	await universalAccess.setPublicAccess(
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