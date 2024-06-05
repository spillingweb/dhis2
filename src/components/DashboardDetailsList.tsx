import DashboardDetailsItem from "./DashboardDetailsItem";
import classes from "./cssModules/DashboardDetailsList.module.css";
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

  // Fetch dashboard details from API
  const {
    data: dashboardDetails,
    isFetching,
    error,
  } = useHttp<dashboardItemType>("dashboardItems", id);

  // Conditional className depending on active status
  let detailsClass = `${classes.content} ${
    openDashboardId === id ? classes.open : classes.closed
  }`;

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
      {dashboardDetails && (
        <div className={detailsClass}>
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
        </div>
      )}
    </>
  );
};

export default DashboardDetailsList;
