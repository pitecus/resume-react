import './App.css';

import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import INavigationItem from './navigation-item.interface';
import NavigationItem from './NavigationItem';
import { PrinterIcon } from '@heroicons/react/outline';

// Lazy loading routes.
const Changelog = lazy(() => import('./changelog/Changelog'));
const Resume = lazy(() => import('./resume/Resume'));

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

  // Return the JSX element.
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        {/* Navigation */}
        <div className="flex justify-center h-10 bg-white print:hidden shadow">
          <div className="flex flex-grow justify-between max-w-4xl align-middle px-2">
            {/* Left items */}
            <div className="h-10 py-2">
              {/* Logo */}
              <span className="p-1 rounded shadow-md font-bold text-white bg-indigo-700">LM</span>
              {/* Navigation links */}
              <nav className="inline text-md text-indigo-600 font-black capitalize ml-3" role="navigation">
                {navigationItems.map((navigationItem: INavigationItem) => (
                  <NavigationItem item={navigationItem} key={navigationItem.label} />
                ))}
              </nav>
            </div>
            {/* Right items */}
            <div className="text-right h-10 py-2">
              <PrinterIcon onClick={window.print} className="sm:hidden inline h-6 w-6 text-gray-500 stroke-current" />
              <span className="sr-only">Print</span>
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="calc(min-h-screen - h-10) flex justify-center">
          <Switch>
            <Route path="/resume">
              <Resume />
            </Route>
            <Route path="/changelog">
              <Changelog />
            </Route>
            <Route path="*">
              <Redirect to="/resume" />
            </Route>
          </Switch>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
