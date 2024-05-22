import classes from "./DashboardDetailsList.module.css";
import DashboardDetailsItem from "./DashboardDetailsItem";
import { useAccordionContext } from "../store/accordion-context";
import useHttp from "../hooks/useHttp";

interface dashboardItemType {
  id: string;
  type: string;
  text?: string;
  map?: {
    name: string;
  };
  visualization?: {
    name: string;
  };
}

const DashboardDetailsList: React.FC<{ id: string }> = ({ id }) => {
  const { openDashboardId } = useAccordionContext();

  const {
    data: dashboardDetails,
    isFetching,
    error,
  } = useHttp<dashboardItemType>("dashboardItems", id);

  let className = `${classes.content} ${
    openDashboardId === id ? classes.open : classes.closed
  }`;

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
    <div className={className}>
      {dashboardDetails.length > 0 && (
        <ul className={classes.details}>
          {dashboardDetails.map((item) => (
            <DashboardDetailsItem
              key={item.id}
              type={item.type}
              // prettier-ignore
              text={
                item.type === "TEXT" ? item.text!
                  : item.type === "VISUALIZATION" ? item.visualization!.name
                  : item.type === "MAP" ? item.map!.name
                  : ''
              }
            />
          ))}
        </ul>
      )}
      {dashboardDetails.length === 0 && (
        <div className={classes.center}>
          <h2>There was a problem fetching the data from the DHIS2 API</h2>
        </div>
      )}
    </div>
  );
};

export default DashboardDetailsList;
