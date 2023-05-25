import { screen, render, act } from "@testing-library/react";
import { createServer } from "../../test/server";
import AuthButtons from "./AuthButtons";
import { MemoryRouter } from "react-router";
import { SWRConfig } from "swr";

const renderComponent = async () => {
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <MemoryRouter>
        <AuthButtons />
      </MemoryRouter>
    </SWRConfig>
  );
  await screen.findAllByRole("link");
};

// createServer() --> GET '/api/user' ---> { user: null }
describe("when user is not signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: null };
      },
    },
  ]);

  test("sign in and sign up are visible", async () => {
    await renderComponent();

    const signInButton = screen.getByRole("link", { name: /sign in/i });
    const signUpButton = screen.getByRole("link", { name: /sign up/i });

    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute("href", "/signin");
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });

  test("sign out is not visible", async () => {
    await renderComponent();

    const signOutButton = screen.queryByRole("link", { name: /sign out /i });
    expect(signOutButton).not.toBeInTheDocument();
  });
});

// createServer() --> GET '/api/user' ---> { user: {id: 3, email: email@email.com} }

describe("when user is signed in", () => {
  createServer([
    {
      path: "/api/user",
      res: () => {
        return { user: { id: 3, email: "email@email.com" } };
      },
    },
  ]);

  test("sign in and sign up are not visible", async () => {
    await renderComponent();
    const signInButton = screen.queryByRole("link", { name: /sign in/i });
    expect(signInButton).not.toBeInTheDocument();
    const signUpButton = screen.queryByRole("link", { name: /sign up/i });
    expect(signUpButton).not.toBeInTheDocument();
  });

  test("sign out is visible", async () => {
    await renderComponent();
    const signOutButton = await screen.findByRole("link", {
      name: /sign out/i,
    });
    expect(signOutButton).toBeInTheDocument();
    expect(signOutButton).toHaveAttribute("href", "/signout");
  });
});

const pause = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 100);
  });
};
