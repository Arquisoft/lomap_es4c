import { render, screen } from "@testing-library/react";
import LogIn from "../components/views/logIn";
test('launches login page', () => {
    render(<LogIn />);
    const linkElement = screen.getByText(/Login/i);
  });
  