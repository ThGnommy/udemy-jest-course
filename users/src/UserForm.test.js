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

test("it calls addUser when the form submitted", () => {
  // not the best implementation
  const argList = [];
  const callback = (...args) => {
    argList.push(args);
  };

  // try to render my component
  render(<UserForm onUserAdd={callback} />);

  // find the two inputs
  const [nameInput, emailInput] = screen.getAllByRole("textbox");

  // simulate typing in a name
  user.click(nameInput);
  user.keyboard("jane");

  // simulate typing in a email
  user.click(emailInput);
  user.keyboard("jane@email.com");

  // find the button
  const button = screen.getByRole("button");

  // simulate button click
  user.click(button);

  // assertion to make sure addUser gets called with email/name
  expect(argList).toHaveLength(1);
  expect(argList[0][0]).toEqual({ name: "jane", email: "jane@email.com" });
});
