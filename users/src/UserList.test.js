import { render, screen, within } from "@testing-library/react";
import { UserList } from "./components/UserList";

function renderComponent() {
  const users = [
    {
      name: "jane",
      email: "jane@email.com",
    },
    {
      name: "jack",
      email: "jack@email.com",
    },
  ];

  render(<UserList users={users} />);

  return { users };
}

test("render one row per user", async () => {
  // render the component
  renderComponent();

  // find all the rows in the table
  // # Approach 1
  // look inside the 'users' element defined by 'data-testid' prop in the component, then get the numbers of rows
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // # Approach 2
  // eslint-disable-next-line
  // const rows = container.querySelectorAll("tbody tr");
  expect(rows).toHaveLength(2);
});

// ⬇️ this will run before the tests
beforeEach(() => {});

test("render the email and name of each user", () => {
  // render the component
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole("cell", { name: user.name });
    const email = screen.getByRole("cell", {
      name: user.email,
    });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
});
