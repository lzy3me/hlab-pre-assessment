import { render, screen } from "@testing-library/react";
import App from "./App";

global.fetch = jest.fn();

describe("UserProfile component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("rendering loading state", () => {
    render(<App userId={1} />);
    const linkElement = screen.getByText(/Loading.../i);
    expect(linkElement).toBeInTheDocument();
  });

  test("display user data after fetch", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ name: "Jane Doe", email: "jane.doe@neps.gov" }),
    });

    render(<App userId={1} />);

    const name = await screen.findByText("Jane Doe");
    const email = await screen.findByText("Email: jane.doe@neps.gov");

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });

  test("display fetch failed", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<App userId={1} />);

    const err = await screen.findByText(/Failed to fetch user data/i);

    expect(err).toBeInTheDocument();
  });
});
