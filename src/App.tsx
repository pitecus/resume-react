import './App.css';

import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import INavigationItem from './navigation-item.interface';
import NavigationItem from './NavigationItem';

function App() {
  /**
   * Navigation items.
   */
  const navigationItems: INavigationItem[] = [
    {
      label: 'resume',
      link: '/resume'
    },
    {
      label: 'changelog',
      link: '/changelog'
    }
  ];

  /**
   * Toogle the navigation menu.
   * @param e the event
   */
  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement>) => {
    console.log('You clicked toggleMenu.', e);
    // TODO: toogle the navigation menu.
  };

  // Return the function.
  return (
    <Router>
      {/* Menu button */}
      <button className=" focus:outline-none z-20 absolute top-3 left-3 border rounded-lg shadow-md bg-white print:hidden"
        aria-label="toogle navigation menu"
        onClick={toggleMenu}>
        <svg xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-indigo-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {/* Menu navigation */}
      <div>
        <nav
          className="z-10 absolute top-12 bg-white w-44 rounded-r-lg shadow-md text-sm text-indigo-600 font-bold capitalize print:hidden"
          role="navigation">
          <div className="flex flex-col justify-center">
            {
              navigationItems.map((navigationItem: INavigationItem) =>
                <NavigationItem item={navigationItem} toggleMenu={toggleMenu} key={navigationItem.label} />
              )
            }
          </div>
        </nav>
      </div>
      {/* Navigation */}
      <Switch>
        <Route path="/resume">
          <p>Resume!</p>
        </Route>
        <Route path="/changelog">
          <p>Changelog!</p>
        </Route>
        <Route path="*">
          <Redirect to="/resume" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
