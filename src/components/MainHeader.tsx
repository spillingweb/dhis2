import { useContext } from "react";
import { FilterContext, FilterContextType } from "../store/filter-context";
import classes from "./cssModules/MainHeader.module.css";

const MainHeader: React.FC = () => {
  const { onFilter } = useContext(FilterContext) as FilterContextType;
  
  const typesArray = ["All Types", "Visualization", "Map", "Text", "Messages"];

  return (
    <div className={classes["header-container"]}>
      <header className={classes.header}>
        <h1 className={classes.logo}>Dashboards</h1>
        <div className={classes.filter}>
          <label htmlFor="types">Filter Items </label>
          <select id="types" onChange={onFilter}>
            {typesArray.map((item) => (
              <option key={item} value={item.toUpperCase()}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
