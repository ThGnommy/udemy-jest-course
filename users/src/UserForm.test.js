import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";
import { UserForm } from "./components/UserForm";

describe("Accordion test", () => {
  test("it shows two inputs and a button", async () => {
    // render the component
    render(<UserForm />);
    // find or manipulate the component

    const inputs = screen.getAllByRole("textbox");
    const button = screen.getByRole("button");

    // make assertion
    expect(inputs).toHaveLength(2);
    expect(button).toBeInTheDocument();
  });
});
