import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
import { screen, fireEvent, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MapViewer from "./components/views/map"

jest.mock("@inrupt/solid-ui-react", () => ({
	useSession: () => ({
		session: {
			info: {
				webId: "https://pelayodc.inrupt.net/profile/card#me",
			},
		},
	}),
}));

describe("InteractMarkers", () => {
	/**
	 * @jest-environment node
 	*/
	test("render map component", async () => {
		render(<Router><MapViewer></MapViewer></Router>);
		expect(screen.getByText("LoMap")).toBeInTheDocument();
	});

	test("render a marker from the database", async () => {

		//Cargar y comprobar q carga
		render(<Router><MapViewer></MapViewer></Router>);
		expect(screen.getByText("LoMap")).toBeInTheDocument();

		//Comprobar que tiene tantos hijos como puntos deberia tener
		expect(container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes.length).toBe(4);
	});

	test("add a new point", async () => {
		//Cargar y comprobar q carga
		render(<Router><MapViewer></MapViewer></Router>);
		expect(screen.getByText("LoMap")).toBeInTheDocument();

		//Pulsamos el boton
		const addbtn = await screen.getByAltText("edit");
		fireEvent.click(addbtn);
		
		//Pulsar en la pantalla del mapa
		//TODO pulsar en la pantalla en un putno concreto
		fireEvent.click(c)

		//Comprobar que aparece popup y pulsar guardar
		expect(screen.getByText("Nombre:")).toBeInTheDocument();
		let savebtn = container.childNodes[0].childNodes[2].childNodes[0].childNodes[3].childNodes[1].childNodes[6];
		fireEvent.click(container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[1]); //temporalmente clicko sobre un punyto que existe para asegurar que se clicka en la pantalla correctamente

		//Comprobar que aparece un punto nuevo
		expect(container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes.length).toBe(6);
	});

	test("load popup from a marker", async () => {
		//Cargar y comprobar q carga
		render(<Router><MapViewer></MapViewer></Router>);
		expect(screen.getByText("LoMap")).toBeInTheDocument();
		
		//Pulsar un marker
		let marker1 = container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[0];
		fireEvent.click(marker1);

		//Comprobar que se ha cargado el popup
		expect(screen.getByText("Nombre:")).toBeInTheDocument();
	});

	test("remove a marker", async () => {
		//Cargar y comprobar q carga
		render(<Router><MapViewer></MapViewer></Router>);
		expect(screen.getByText("LoMap")).toBeInTheDocument();
		
		//Pulsar un marker
		let marker1 = container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes[0];
		fireEvent.click(marker1);

		//Comprobar que se ha cargado el popup
		//let popup = container.childNodes[0].childNodes[2].childNodes[0].childNodes[3];
		expect(screen.getByText("Nombre:")).toBeInTheDocument();

		//pulsar el boton de borrar
		const borrarbtn = await screen.getByAltText("del");
		fireEvent.click(borrarbtn);

		//Comprobar que se ha borrado correctamente contando q ahora hay un punto menos
		expect(container.childNodes[0].childNodes[2].childNodes[0].childNodes[1].childNodes.length).toBe(4);
	});
});