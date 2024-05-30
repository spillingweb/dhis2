import classes from "../styling/DashboardHeader.module.css";
import { useAccordionContext } from "../store/accordion-context";
import { BsStarFill, BsStar, BsChevronDown } from "react-icons/bs";

const DashboardHeader: React.FC<{ title: string; id: string }> = ({
  title,
  id,
}) => {
  const { openDashboardId, toggleDashboard } = useAccordionContext();
  const { starredDashboards, setStarredDashboards } = useAccordionContext();

  // Add or remove favorites from browser local storage on mouse click or Enter key on focus
  function handleStarClick(
    e: React.MouseEvent | React.KeyboardEvent,
    id: string
  ) {
    e.stopPropagation();
    setStarredDashboards((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((item) => item !== id);
      } else {
        return [...prevArray, id];
      }
    });
  }

  // Conditional className arrow up/down depending on active status
  const classChevron = `${classes.chevron} ${
    openDashboardId === id ? classes.open : ""
  }`;

  // Star Icon with or without fill depending on local storage status
  const starIcon = starredDashboards.includes(id) ? (
    <BsStarFill title="Remove from favorites" className={classes.star} />
  ) : (
    <BsStar title="Add to favorites" className={classes.star} />
  );

  return (
    <div
      className={classes.dashboardHeader}
      onClick={() => toggleDashboard(id)}
    >
      <h2 className={classes.title}>{title}</h2>
      <div>
        <span
          tabIndex={0}
          aria-label="Star Icon"
          onClick={(e) => handleStarClick(e, id)}
          onKeyDown={(e) =>
            e.key === "Enter" ? handleStarClick(e, id) : undefined
          }
        >
          {starIcon}
        </span>
        <span aria-label="Arrow Icon">
          <BsChevronDown
            title={openDashboardId === id ? "Collapse" : "Expand"}
            className={classChevron}
          />
        </span>
      </div>
    </div>
  );
};

export default DashboardHeader;
