import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";
import FilterContextProvider from "../store/filter-context";

describe("Dashboard Details List component", () => {
  const setup = () => {
    return {
      user: userEvent.setup(),
      ...render(
        <FilterContextProvider>
          <AccordionContextProvider>
            <DashboardsList />
          </AccordionContextProvider>
        </FilterContextProvider>
      ),
    };
  };

  beforeEach(() => {});

  test("renders mocked dashboard details list if fetch request succeeds", async () => {
    setup();

    const dashboardItemElements = await screen.findAllByRole("dashboardDetails");
    expect(dashboardItemElements).toHaveLength(1); // length of mocked response
  });
});
