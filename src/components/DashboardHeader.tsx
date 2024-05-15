import classes from "./DashboardHeader.module.css";
import { useAccordionContext } from "../store/accordion-context";
import { BsStarFill, BsStar, BsChevronDown } from "react-icons/bs";

const DashboardHeader: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const { openDashboardId, toggleDashboard } = useAccordionContext();
  const { starredDashboards, setStarredDashboards } = useAccordionContext();

  function handleStarClick(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setStarredDashboards((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((item) => item !== id);
      } else {
        return [...prevArray, id];
      }
    });
  }

  let isStarred = false;

  if (starredDashboards && starredDashboards.includes(id)) {
    isStarred = true;
  }

  const classChevron = `${classes.chevron} ${
    openDashboardId === id ? classes.open : ""
  }`;

  return (
    <div
      className={classes.dashboardHeader}
      onClick={() => toggleDashboard(id)}
    >
      <h2 className={classes.title}>{title}</h2>
      <div>
        <span aria-label="Star Icon" onClick={(e) => handleStarClick(e, id)}>
          {isStarred ? <BsStarFill /> : <BsStar />}
        </span>
        <span aria-label="Arrow Icon">
          <BsChevronDown className={classChevron}/>
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;