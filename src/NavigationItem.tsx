import INavigationItem from "./navigation-item.interface";
import {
  Link
} from "react-router-dom";

/**
 * Navigation item.
 */
const NavigationItem = (props: {
  item: INavigationItem
}) => {
  return (<Link
    to={props.item.link}
    className="h-12 py-3 ml-3">
    {/* Resume */}
    {
      props.item.label === 'resume' &&
      <svg xmlns="http://www.w3.org/2000/svg"
        className="inline h-6 w-6 stroke-current text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    }

    {/* Changelog */}
    {
      props.item.label === 'changelog' &&
      <svg xmlns="http://www.w3.org/2000/svg"
        className="inline h-6 w-6 stroke-current text-black"
        fill="none"
        viewBox="0 0 24 24">
        <path strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    }
    <span className="hidden sm:inline">{props.item.label}</span>
  </Link>);
};

/**
 * Export the function.
 */
export default NavigationItem;