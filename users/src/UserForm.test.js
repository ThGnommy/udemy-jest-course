import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { UserForm } from "./components/UserForm";

test("it shows two inputs and a button", () => {
  // render the component
  render(<UserForm />);
  // find or manipulate the component

  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // make assertion

  expect(inputs).toHaveLength(2);

  expect(button).toBeInTheDocument();
});

test("it calls addUser when the form submitted", async () => {
  const mock = jest.fn();

  // try to render my component
  render(<UserForm onUserAdd={mock} />);

  // find the two inputs
  // const [nameInput, emailInput] = screen.getAllByRole("textbox");

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  // simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("jane");

  // simulate typing in a email
  await user.click(emailInput);
  await user.keyboard("jane@email.com");

  // find the button
  const button = screen.getByRole("button");

  // simulate button click
  await user.click(button);

  // assertion to make sure addUser gets called with email/name
  expect(mock).toHaveBeenCalled();

  expect(mock).toHaveBeenCalledWith({
    name: "jane",
    email: "jane@email.com",
  });
});

test("empties the two inputs if form is submitted", async () => {
  render(<UserForm onUserAdd={() => {}} />);

  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });

  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  // simulate typing in a name
  await user.click(nameInput);
  await user.keyboard("jane");

  // simulate typing in a email
  await user.click(emailInput);
  await user.keyboard("jane@email.com");

  // find the button
  const button = screen.getByRole("button");

  // simulate button click
  await user.click(button);

  expect(nameInput).toHaveValue("");
  expect(emailInput).toHaveValue("");
});
