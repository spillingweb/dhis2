import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";
import FilterContextProvider from "../store/filter-context";
import classes from "./cssModules/DashboardDetailsList.module.css";

describe("Dashboard List component", () => {
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

  test("renders mocked dashboard if fetch request succeeds", async () => {
    setup();

    const dashboardItemElements = await screen.findAllByRole("dashboardItem");
    expect(dashboardItemElements).toHaveLength(1); // length of mocked response
  });

  test("renders details of first card on load", async () => {
    setup();

    const detailsText = await screen.findByRole("dashboardDetails");
    expect(detailsText).toHaveClass(classes.open);
  });

  test("dashboard details are hidden on click", async () => {
    const {user} = setup();

    const dashboardHeader = await screen.findByRole("dashboardHeader");
    await user.click(dashboardHeader);

    const detailsText = screen.getByRole("dashboardDetails");
    expect(detailsText).not.toHaveClass(classes.open);
  });
});
