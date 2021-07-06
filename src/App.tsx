import './App.css';

import {
  Redirect,
  Route,
  HashRouter as Router,
  Switch
} from "react-router-dom";

import INavigationItem from './navigation-item.interface';
import NavigationItem from './NavigationItem';
import Resume from './resume/Resume';

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

  // Return the function.
  return (
    <Router>
      {/* Navigation */}
      <div className="flex justify-center h-10 bg-white print:hidden shadow">
        <div className="flex flex-grow justify-between max-w-4xl align-middle px-2">
          {/* Left items */}
          <div className="h-10 py-2">
            {/* Logo */}
            <span className="p-1 rounded shadow-md font-bold text-white bg-indigo-700">LM</span>
            {/* Navigation links */}
            <nav
              className="inline text-md text-indigo-600 font-black capitalize ml-3"
              role="navigation">
              {
                navigationItems.map((navigationItem: INavigationItem) =>
                  <NavigationItem item={navigationItem} key={navigationItem.label} />
                )
              }
            </nav>
          </div>
          {/* Right items */}
          <div className="text-right"></div>
        </div>
      </div>
      {/* Content */}
      <div className="min-h-screen flex justify-center">
        <Switch>
          <Route path="/resume">
            <Resume />
          </Route>
          <Route path="/changelog">
            <p>Changelog!</p>
          </Route>
          <Route path="*">
            <Redirect to="/resume" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
