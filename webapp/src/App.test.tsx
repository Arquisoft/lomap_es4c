import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Source code/i);
  expect(linkElement).toBeInTheDocument();
});

test("Home page is rendered", async () => {
  const { getByText, container } = render(
    <Router>
      <App></App>
    </Router>
  );

  //Check that the info about stock is rendered correctly
  expect(getByText("LoMap")).toBeInTheDocument();
  expect(getByText("Seleccione el mapa que desee abrir")).toBeInTheDocument();

  // Expect there are 2 elements inside the first (stack)
  expect(container.childNodes[0].childNodes.length).toBe(2);
});
