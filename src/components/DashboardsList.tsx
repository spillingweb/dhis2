import DashboardItem from "./DashboardItem";
import classes from "./cssModules/DashboardsList.module.css";
import useHttp from "../hooks/useHttp";

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

  return (
    <>
      {isFetching && (
        <div className={classes.center}>
          <p>Loading DHIS2 Dashboards...</p>
        </div>
      )}
      {error && (
        <div className={classes.center}>
          <p>{error}</p>
        </div>
      )}
      {dashboards && (
        <ul className={classes.dashboardList}>
          {dashboards.map((dashboard, index) => (
            <DashboardItem
              key={dashboard.id}
              index={index}
              id={dashboard.id}
              title={dashboard.displayName}
            />
          ))}
        </ul>
      )}
    </>
  );
};

export default DashboardsList;
