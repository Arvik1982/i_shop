import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Rating from "../components/Raiting/Rating";

describe("Pages render test", () => {
  test("Renders rating", () => {
    render(<Rating value={1} />);
    expect(screen.getByLabelText(/rating of product/i)).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(5);
  });
});
