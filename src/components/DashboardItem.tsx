import { useAccordionContext } from "../store/accordion-context";
import classes from "./cssModules/DashboardItem.module.css";
import DashboardHeader from "./DashboardHeader";
import DashboardDetailsList from "./DashboardDetailsList";

const DashboardItem: React.FC<{ id: string; title: string }> = ({
  id,
  title,
}) => {
  const { openDashboardId, toggleDashboard } = useAccordionContext();

  // // Conditional className depending on active status
  let itemClass = `${classes.dashboard} ${
    openDashboardId === id ? classes.open : ""
  }`;  

  return (
    <li
      className={itemClass}
      tabIndex={0}
      id={id}
      onKeyDown={(e) => (e.key === "Enter" ? toggleDashboard(id) : undefined)} 
    >
      <DashboardHeader title={title} id={id} />
      <DashboardDetailsList id={id} />
    </li>
  );
};

export default DashboardItem;
