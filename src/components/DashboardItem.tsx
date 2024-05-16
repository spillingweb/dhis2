import { useAccordionContext } from "../store/accordion-context";
import classes from "./DashboardItem.module.css";
import DashboardHeader from "./DashboardHeader";
import DashboardDetailsList from "./DashboardDetailsList";

const DashboardItem: React.FC<{ id: string, title: string }> = ({ id, title }) => {
  const { openDashboardId } = useAccordionContext();

  let className = `${classes.dashboard} ${
    openDashboardId === id ? classes.open : ''
  }`;

  return <li className={className}>
        <DashboardHeader title={title} id={id} />
        <DashboardDetailsList id={id}/>
    </li>;
};

export default DashboardItem;
