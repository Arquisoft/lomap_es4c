import { Session, fetch } from '@inrupt/solid-client-authn-browser';
import { MapMarker, MapMarkerReview, Comment, Maps,Location, Picture, ReviewScore } from '../shared/shareddtypes';
import { getFile, getDecimal, getStringNoLocale, saveFileInContainer, overwriteFile, getUrlAll, buildThing, getSolidDataset, createSolidDataset, createThing, Thing, removeThing, setThing, getThing, getThingAll, addUrl, addStringNoLocale, getSolidDatasetWithAcl, getUrl, saveSolidDatasetAt } from '@inrupt/solid-client';
import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { Marker } from 'mapbox-gl';
import { Console, timeStamp } from 'console';
import type {Graph} from 'schema-dts';


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

export async function addSolidMarker(session: Session, idp: String, marker: Maps) {
	const pointName = 'Prueba';
	const webId = session.info.webId as string;

	var punto = marker.maps[0];
	
	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	//const dataset = await getSolidDataset(mapPointsUrl).catch(error => console.error(error));;
	//const newDataset = createSolidDataset();
	
	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);

	let mapData = {
		 "@context": "https://schema.org/",
            "@type": "Place",
            "identifier": "aaaaa",
            "name": punto.name,
            "author": {
                "@type":"Person",
                "identifier": webId
            },
            "additionalType": punto.locations[0].category,
            "latitude": punto.locations[0].latitude,
            "longitude": punto.locations[0].longitude,
            "description": punto.locations[0].description,
            "review": [],
            "image": [],
            "dateCreated": new Date().valueOf()
        };
		
	console.log("mapData " + mapData);
	console.log("mapData " + JSON.stringify(mapData));
	//let originalBlob = await getFile(mapPointsUrl, { fetch: fetch });
	let blob = new Blob([JSON.stringify(mapData)], { type: "application/json" });
	//let originalFile = new File([originalBlob], punto.name + ".json", { type: originalBlob.type });
	let file = new File([blob], punto.name + ".json", { type: blob.type });
	//let updated = new File([originalFile, file], punto.name + ".json", { type: blob.type });
	//console.log("updated " + updated);
	await saveFileInContainer(mapPointsUrl, file, { fetch: fetch });
	
	/*
	const dataset = await getSolidDataset(mapPointsUrl).catch(error => console.error(error));;

	const newDataset = createSolidDataset();

	console.log("session is logged " + session.info.isLoggedIn);
	console.log("session " + session.info);


	//const dataset = getSolidDatasetWithAcl();
	console.log(punto.locations[0].id);

	const mapPointsThing = buildThing(createThing({ name: punto.locations[0].id }))
		//console.log("name " + pointName);
		//console.log("things " + mapPointsThing);
		// Añadir las propiedades del punto de mapa como URLs o cadenas de texto sin localización
		.addDecimal('http://schema.org/latitude', punto.locations[0].latitude)
		.addDecimal('http://schema.org/longitude', punto.locations[0].longitude)
		.addStringNoLocale('http://schema.org/category', punto.locations[0].category)
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
	*/
	return punto.locations[0].id;
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


export async function getMarkers(session: Session, webId: String) {
	const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'


	const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
	console.log("url12345678 " + mapPointsUrl);
	console.log("session sbkd" + session.fetch);
	const dataset = await getSolidDataset(mapPointsUrl, { fetch: session.fetch as any }).catch(error => createSolidDataset());
	if(dataset === null){
		console.log("dataset is null");
	}
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

export async function createMap(mapName:string, session:Session, webId:string) {
	try{
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		const dataset = await getSolidDataset(mapPointsUrl, { fetch: session.fetch as any });
	}
	catch(error){
		console.log("No existe el mapa");
		const mapPointsUrl = webId.replace("profile/card#me", "") + 'public/lomap/Map';//proveedor+webId+nombreCategoria
		const dataset = await createSolidDataset();

		let map : MapMarker = {
			id: "12345657635452674u5u4yt3yu65",
			name: mapName,
			author: webId,
			locations: []
		}

		let place : Graph= {
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

        let blob = new Blob([JSON.stringify(place)], { type: "application/ld+json" });
		console.log("blob " + mapPointsUrl);
        let file = new File([blob], "map" + ".jsonld", { type: blob.type });

		

        await overwriteFile(
            mapPointsUrl,
            blob,
            { contentType: blob.type, fetch: session.fetch as any}
        );

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