import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";
import classes from "./cssModules/DashboardDetailsList.module.css";
import FilterContextProvider from "../store/filter-context";

describe("Dashboard Item component", () => {
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

  test("opens details of first card on load", async () => {
    setup();

    const detailsText = await screen.findByRole("dashboardDetails");
    expect(detailsText).toHaveClass(classes.open);
  });

  test("can focus on dashboard by pressing tab", async () => {
    const {user} = setup();

    const dashboard = await screen.findByRole("dashboardItem");
    await user.tab();

    expect(dashboard).toHaveFocus();
  });

  test("can closed focused dashboard by clicking enter", async () => {
    const { user } = setup();

    const dashboard = await screen.findByRole("dashboardItem");
    dashboard.focus();
    await user.keyboard('{Enter}');

    const detailsText = screen.getByRole("dashboardDetails");
    expect(detailsText).not.toHaveClass(classes.open);
  })
});
