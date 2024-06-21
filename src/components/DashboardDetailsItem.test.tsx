import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import MainHeader from "./MainHeader";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";
import FilterContextProvider from "../store/filter-context";

describe("Dashboard Details Item component", () => {
  const setup = () => {
    return {
      user: userEvent.setup(),
      ...render(
        <FilterContextProvider>
          <MainHeader />
          <AccordionContextProvider>
            <DashboardsList />
          </AccordionContextProvider>
        </FilterContextProvider>
      ),
    };
  };

  beforeEach(() => {});

  test("filter options can be selected", async () => {
    const { user } = setup();

    const filterMenu = await screen.findByRole('combobox');
    await user.selectOptions(filterMenu, "MAP");

    expect((screen.getByRole('option', {name: 'Map'}) as HTMLOptionElement).selected).toBe(true);
  })

  test("non-selected details items are hidden when filtering", async () => {
    const { user } = setup();

    const filterMenu = await screen.findByRole('combobox');
    await user.selectOptions(filterMenu, "MAP");

    expect(screen.getByRole('visualizationItem')).not.toBeVisible;
    expect(screen.getByRole('mapItem')).toBeVisible;
  });

  test("selected details items are visible when filtering", async () => {
    const { user } = setup();

    const filterMenu = await screen.findByRole('combobox');
    await user.selectOptions(filterMenu, "MAP");

    expect(screen.getByRole('mapItem')).toBeVisible;
  });
});
