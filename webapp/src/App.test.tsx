import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from '@testing-library/react';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Escuela Ingeniería informática 2022-2023/ASW grupo lomap_es4c");
  expect(linkElement).toBeInTheDocument();
});

test("Home page is rendered", async () => {
  const { getByText, container } = render(
      <App></App>
  );

  //Check that the info about stock is rendered correctly
  expect(screen.getByText("Red social de mapas")).toBeInTheDocument();

  // Expect there are 2 elements inside the first (stack)
  //expect(container.childNodes[0].childNodes.length).toBe(2);
});