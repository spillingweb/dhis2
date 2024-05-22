import DashboardItem from "./DashboardItem";
import classes from "./DashboardsList.module.css";
import useHttp from "../hooks/useHttp";
import { useAccordionContext } from "../store/accordion-context";
import { useEffect } from "react";

interface dashboardType {
  displayName: string;
  id: string;
}

const DashboardsList: React.FC = () => {
  // Fetch dashboard data
  const {
    data: dashboards,
    error,
    isFetching,
  } = useHttp<dashboardType>("dashboards");

  // Open first dashboard on load
  const { toggleDashboard } = useAccordionContext();

  useEffect(() => {
    if (dashboards.length > 0 && !error) {
      toggleDashboard(dashboards[0].id);
    }
  }, [dashboards]);

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
