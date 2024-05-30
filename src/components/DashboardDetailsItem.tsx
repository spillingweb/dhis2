import { useContext } from 'react';
import { FilterContext, FilterContextType } from '../store/filter-context';
import classes from '../styling/DashboardDetailsItem.module.css';
import { BsFileBarGraph, BsGlobe2, BsGraphDown, BsFileText } from 'react-icons/bs';

const DashboardDetailsItem: React.FC<{ type: string, text: string }> = ({ type, text }) => {
    const { filtered } = useContext(FilterContext) as FilterContextType;

    // Setting the icon based on the type
    const icon =    type === 'TEXT' ? <BsFileText />
                    : type === 'VISUALIZATION' ? <BsGraphDown />
                    : type === 'MAP' ? <BsGlobe2 />
                    : <BsFileBarGraph />;

    // Conditional className depending on selected filter
    let listElClass: string;

    if (filtered === 'ALL TYPES' || filtered === type) {
        listElClass = `${classes.listEl} ${classes.visible}`;
    } else {
        listElClass = `${classes.listEl} ${classes.hidden}`;
    }
    
    return (
        <li className={listElClass}>
            <p>{icon}</p>
            <p>{text}</p>
        </li>
    )
}

export default DashboardDetailsItem;