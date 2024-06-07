import { render, screen } from "@testing-library/react";
import { describe } from "vitest";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";

describe("Dashboard List component", () => {
  // Test if dashboard cards are being rendered correctly
  test("renders mocked dashboard if fetch request succeeds", async () => {
    // Arrange
    render(
      <AccordionContextProvider>
        <DashboardsList />
      </AccordionContextProvider>
    );

    // Assert
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).toHaveLength(1); // length of mocked response
  });
});
