import {
  Link,
  useLocation
} from "react-router-dom";
import { BriefcaseIcon, ClipboardListIcon } from '@heroicons/react/outline';
import INavigationItem from "./navigation-item.interface";

/**
 * Navigation item.
 */
const NavigationItem = (props: {
  item: INavigationItem
}) => {
  // Get the current location.
  let location = useLocation();

  // Change the color based on the route.
  let routeColor = 'text-gray-500 hover:text-black';
  let iconColor = '';
  if (location.pathname === props.item.link ? 'underline' : '') {
    routeColor = 'text-indigo-600';
    iconColor = 'text-black';
  }

  // Return the component.
  return (<Link
    to={props.item.link}
    aria-label={props.item.label}
    className={`h-12 py-3 ml-3 ${routeColor}`}>
    {/* Resume */}
    {
      props.item.label === 'resume' &&
      <BriefcaseIcon className={`inline h-6 w-6 stroke-current ${iconColor}`}/>
    }

    {/* Changelog */}
    {
      props.item.label === 'changelog' &&
      <ClipboardListIcon className={`inline h-6 w-6 stroke-current ${iconColor}`} />
    }
    <span className="hidden sm:inline">{props.item.label}</span>
  </Link>);
};

/**
 * Export the function.
 */
export default NavigationItem;