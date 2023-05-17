import { render, screen, within } from "@testing-library/react";
import { UserList } from "./components/UserList";

test("render one row per user", () => {
  // render the component

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

  const { container } = render(<UserList users={users} />);

  // find all the rows in the table
  // # Approach 1
  // look inside the 'users' element defined by 'data-testid' prop in the component, then get the numbers of rows
  const rows = within(screen.getByTestId("users")).getAllByRole("row");

  // # Approach 2
  // eslint-disable-next-line
  // const rows = container.querySelectorAll("tbody tr");

  expect(rows).toHaveLength(2);
});

// test("render the email and name of each user", () => {});
