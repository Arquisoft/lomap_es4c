import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent,render, screen } from '@testing-library/react';

import App from './App';
import LogIn from "./components/views/logIn";

test('LogIn', () => {
  render(<App />);
  const linkElement = screen.getByText("Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c");
  let linkElement2 = screen.getByText("Log in");
  fireEvent.click(linkElement2);
  const linkElement3 = screen.getByText("Inicio de sesión");
  expect(linkElement3).toBeInTheDocument();
});

test("QueEsSolidTest", async () => {
  render(<Router><LogIn /></Router>);
  let linkElement4 = screen.getByText("¿Qué es Solid?");
  fireEvent.click(linkElement4);
  const linkElement5 = await screen.getByText((content, element) => content.startsWith('Solid'))
  expect(linkElement5).toBeInTheDocument();

 
});