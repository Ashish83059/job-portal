import { render, screen } from '@testing-library/react';
import Home from '..';
import { BrowserRouter } from "react-router-dom";

const MockHome = () => {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
};

test('should render Heading in Home component', () => {
  render(<MockHome />);
  
  // Ensure there is a heading in the document
  const heading = screen.getByRole("heading", { level: 3 });
  
  // Check if the heading text exists
  expect(heading).toBeInTheDocument();
});

test('should render button in Home component', () => {
  render(<MockHome />);
  
  // Ensure button exists with data-testid="btn"
  const button = screen.getByTestId("btn");
  expect(button).toBeInTheDocument();
});

test("should render social media images", () => {
  render(<MockHome />);
  
  // Check if images exist with the data-testid="images"
  const images = screen.getByTestId("images");
  
  // If these images have specific alt text or src attributes, you can test those as well
  expect(images).toBeInTheDocument();
  // Example of additional check (if needed):
  // expect(images).toHaveAttribute("src", "path_to_image");
});
