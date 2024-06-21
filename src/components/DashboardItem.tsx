import { useAccordionContext } from "../store/accordion-context";
import classes from "./cssModules/DashboardItem.module.css";
import DashboardHeader from "./DashboardHeader";
import DashboardDetailsList from "./DashboardDetailsList";
import { useEffect } from "react";

const DashboardItem: React.FC<{ index: number, id: string; title: string }> = ({
  index,
  id,
  title,
}) => {
  const { openDashboardId, toggleDashboard } = useAccordionContext();

  const isActive = openDashboardId === id;

  // Open first dashboard on load
  useEffect(() => {
    if (index === 0) {
      toggleDashboard(id);
    }
  }, []);  
      
  return (
    <li
      className={`${classes.dashboard} ${isActive ? classes.active : ''}`}
      tabIndex={0}
      id={id}
      onKeyDown={(e) => (e.key === "Enter" ? toggleDashboard(id) : undefined)} 
      role="dashboardItem"
    >
      <DashboardHeader title={title} id={id} />
      <DashboardDetailsList id={id} isOpen={isActive} />
    </li>
  );
};

export default DashboardItem;
