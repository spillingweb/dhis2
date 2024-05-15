import { useState, createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type AccordionContextType = {
  openDashboardId: string | null;
  toggleDashboard: (id: string) => void;
  starredDashboards: string[],
  setStarredDashboards: React.Dispatch<React.SetStateAction<string[]>>;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);

  if (!ctx) {
      throw new Error(
          "Accordion-related components must be wrapped by <AccordionContextProvider>"
      );
  }

  return ctx;
}

export default function AccordionContextProvider({children}: any) {
  const [openDashboardId, setOpenDashboardId] = useState<string | null>(null);
  const [starredDashboards, setStarredDashboards] = useLocalStorage();

  function toggleDashboard(id: string) {
    setOpenDashboardId((prevId) => (prevId === id ? null : id));
  }

  const contextValue: AccordionContextType = {
    openDashboardId,
    toggleDashboard,
    starredDashboards,
    setStarredDashboards
  };

  return (
    <AccordionContext.Provider value={contextValue}>
        {children}
    </AccordionContext.Provider>
  )
};