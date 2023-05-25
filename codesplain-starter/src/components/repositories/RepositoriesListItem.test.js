import { screen, render, act } from "@testing-library/react";
import RepositoriesListItem from "./RepositoriesListItem";
import { MemoryRouter } from "react-router";

// Instead of load the real file, fake it (override) the content with that
// Skipping the component that causing the issue
// jest.mock("../tree/FileIcon", () => {
//   return () => {
//     return "File Icon Component";
//   };
// });

const renderComponent = () => {
  const repository = {
    full_name: "TheAlgorithms/Python",
    language: "Python",
    description: "All Algorithms implemented in Python",
    owner: { login: "Python" },
    name: "TheAlgorithms",
    html_url: "https://github.com/python/the-algorithms",
  };

  render(
    <MemoryRouter>
      <RepositoriesListItem repository={repository} />
    </MemoryRouter>
  );

  return { repository };
};

test("shows a link to the github homepage", async () => {
  const { repository } = renderComponent();

  // WORST SOLUTION 👇
  // await act(async () => {
  //   await pause();
  // });

  await screen.findByRole("img", { name: /python/i });
  const link = screen.getByRole("link", { name: /github repository/i });
  expect(link).toHaveAttribute("href", repository.html_url);
  expect(link).toHaveAttribute("target", "_blank");
});

// const pause = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, 100);
//   });
// };

test("show the fileicon with the appropriate icon", async () => {
  renderComponent();
  const icon = await screen.findByRole("img", { name: /python/i });
  expect(icon).toHaveClass("python-icon");
});

test("show the link to the code editor page", async () => {
  const { repository } = renderComponent();
  await screen.findByRole("img", { name: /python/i });

  const link = await screen.findByRole("link", {
    name: new RegExp(repository.owner.login),
  });

  expect(link).toHaveAttribute("href", `/repositories/${repository.full_name}`);
});
