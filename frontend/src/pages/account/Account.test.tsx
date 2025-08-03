import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";

import Account from "./Account";

vi.mock("../../authentication/useAuth", () => ({
  useAuth: () => ({
    user: {
      id: "123",
      username: "testuser",
    },
  }),
}));

describe("Account", () => {
  test("should render account management page", () => {
    render(
      <BrowserRouter>
        <Account />
      </BrowserRouter>
    );

    expect(screen.getByText("Manage Account")).toBeInTheDocument();
    expect(screen.getByText("Log out")).toBeInTheDocument();
    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByLabelText("Username")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Account" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete Account" })
    ).toBeInTheDocument();
  });
});
