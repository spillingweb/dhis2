import DashboardItem from "./DashboardItem";
import classes from "./DashboardsList.module.css";
import useHttp from "../hooks/useHttp";
import { useAccordionContext } from "../store/accordion-context";
import { useEffect } from "react";

const DashboardsList: React.FC = () => {
  const {
    data: dashboards,
    error,
    isFetching,
  } = useHttp(
    "https://gist.githubusercontent.com/kabaros/da79636249e10a7c991a4638205b1726/raw/fa044f54e7a5493b06bb51da40ecc3a9cb4cd3a5/dashboards.json",
    "dashboards"
  );

  const {toggleDashboard} = useAccordionContext();

  useEffect(() => {
    if (dashboards.length > 0 && !error) {
      toggleDashboard(dashboards[0].id);
    }
  }, [dashboards])

  if (isFetching) {
    return (
      <div className={classes.center}>
        <p>Loading DHIS2 Dashboards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.center}>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <ul className={classes.dashboardList}>
      {dashboards.map((dashboard) => (
        <DashboardItem
          key={dashboard.id}
          id={dashboard.id}
          title={dashboard.displayName}
        />
      ))}
    </ul>
  );
};

export default DashboardsList;
