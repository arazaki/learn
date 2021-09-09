import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceWithCamelWithSpaces } from "./App";

test("button has a correct color", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: /change to Midnight Blue/i
  });
  // initial state of the button
  expect(buttonElement).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(buttonElement);

  // expect the background color to be blue
  expect(buttonElement).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be Change to Medium Violet Red
  expect(buttonElement.textContent).toBe("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  //check that the button starts out enabled
  const buttonElement = screen.getByRole("button", {
    name: "Change to Midnight Blue"
  });
  expect(buttonElement).toBeEnabled();

  //check that the checkbox starts unchecked
  const checkboxElement = screen.getByRole("checkbox");
  expect(checkboxElement).not.toBeChecked();
});

test("interacting with the checkbox element", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: "Change to Midnight Blue"
  });
  const checkboxElement = screen.getByRole("checkbox", {
    name: "Disable Button"
  });

  expect(buttonElement).toBeEnabled();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeDisabled();

  fireEvent.click(checkboxElement);

  expect(buttonElement).toBeEnabled();
});

test("change button color to gray whan disabled", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button", {
    name: "Change to Midnight Blue"
  });
  const checkboxElement = screen.getByRole("checkbox");

  fireEvent.click(checkboxElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkboxElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(buttonElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: "MidnightBlue" });

  fireEvent.click(checkboxElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkboxElement);

  expect(buttonElement).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before Camel-case capital letters letters", () => {
  test("Works for no inner capital letter", () => {
    expect(replaceWithCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceWithCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceWithCamelWithSpaces("MediumVioletRed")).toBe(
      "Medium Violet Red"
    );
  });
});
