import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
import { BrowserRouter as Router } from "react-router-dom";
import MapViewer from "./components/views/map"
import { screen, fireEvent, render } from "@testing-library/react";


jest.mock("@inrupt/solid-ui-react", () => ({
	useSession: () => ({
		session: {
			info: {
				webId: "https://pelayodc.inrupt.net/profile/card#me",
			},
		},
	}),
}));

describe("SessionInteractions", () => {
	/**
	 * @jest-environment node
 	*/
	test("LogOut", async () => {
        //cargamos el mapa
		render(<Router><MapViewer></MapViewer></Router>);
		
        //Le damos al botón de cerrar sesión
        const addbtn = await screen.getByText("Cerrar sesión");
		fireEvent.click(addbtn);
        //Comprobamos que aparece la ventana de inicio
        expect(screen.getByText("Red social de mapas")).toBeInTheDocument();
	});

	test("Profile", async () => {

		//Cargar mapa
		render(<Router><MapViewer></MapViewer></Router>);
		//Le damos al botón de ver perfil
        const addbtn = await screen.getByText("Ver perfil");
        fireEvent.click(addbtn);
        //Comprobamos que aparece la ventana de perfil
        expect(screen.getByText("Datos del usuario")).toBeInTheDocument();

	});
});