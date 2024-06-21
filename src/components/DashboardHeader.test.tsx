import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe } from "vitest";
import DashboardsList from "./DashboardsList";
import AccordionContextProvider from "../store/accordion-context";
import FilterContextProvider from "../store/filter-context";
import mockLocalStorage from "../mocks/localStorage";

describe("Dashboard Header component", () => {
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

  test("click on star stores dashboard id to (mock) local storage", async () => {
    const { user } = setup();

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
    });

    const star = await screen.findByLabelText('Star Icon');
    await user.click(star);

    const starred = localStorage.getItem("starredDashboards");
    const starredArray: string[] = starred ? JSON.parse(starred) : []

    expect(starredArray).toHaveLength(1);
  });  
});
