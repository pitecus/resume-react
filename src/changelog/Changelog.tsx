import IChangelog from "./changelog.interface";
import IChangelogDetail from "./changelog-detail.interface";
import IRelease from "./release.interface";
import React from "react";
import Release from "./Reelase";

/**
 * Resume component.
 */
class Resume extends React.Component<
  {},
  {
    error: null,
    isLoaded: boolean,
    releases: IRelease[]
  }
> {

  /**
   * Sorting commit types.
   */
  private sortingTypes: { [type: string]: number } = {
    feat: 1,
    fix: 2,
    perf: 3,
    test: 4,
    style: 5,
    revert: 6,
    build: 7,
    refactor: 8,
    chore: 9,
    docs: 10,
    ci: 11,
  };

  /**
   * Create a component.
   * @param props the properties
   */
  public constructor(props: {}) {
    super(props);

    // Initialize the state.
    this.state = {
      releases: [],
      error: null,
      isLoaded: false
    };
  }

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  public componentDidMount(): void {
    // Retrieve the changelog.
    // Retrieve the resume.
    fetch("/assets/changelog.json")
      // Extract only the json portion of the request.
      .then(res => res.json())
      // Process the result.
      .then(
        (changelogs: IChangelog[]) => {
          // Initialize the releases.
          const releases: IRelease[] = [];

          // Current release.
          let currentRelease: IRelease;
          let currentChanges: { [type: string]: IChangelogDetail[] };

          // Loop throught the changelog and populate the release.
          changelogs.forEach((entry: IChangelog): void => {
            // Extract tag from current entry.
            const tag = entry
              .decoration
              .replace(/[ ()]/g, '')
              .split(',')
              .filter((entry: string) => entry.startsWith('tag:') === true)
              .pop();

            if (tag !== undefined || currentRelease === undefined) {
              // Current changes grouped by type.
              currentChanges = {};

              if (tag !== undefined) {
                // Initialize a release.
                currentRelease = {
                  changes: [],
                  version: tag.replace('tag:', '')
                };
              } else {
                // Initialize a release.
                currentRelease = {
                  changes: [],
                  version: ''
                };
              }

              // Add to the releases.
              releases.push(currentRelease);
            }

            // Parse the commit message.
            const [type, subject] = entry.subject.split(':', 2);

            // Check if type already exists.
            if (currentChanges[type] === undefined) {
              currentChanges[type] = [];

              // Append to the release.
              currentRelease.changes.push({
                type,
                changes: currentChanges[type]
              });
            }

            // Append
            currentChanges[type].push({
              commiter: entry.commiter,
              date: entry.date,
              message: {
                scope: '',
                subject: subject.trim(),
                type
              }
            })
          });

          // Sort the change types.
          releases
            .forEach((release) => {
              release.changes
                .sort((a, b) => this.sortingTypes[a.type] - this.sortingTypes[b.type])
            });

          // Update the releases.
          this.setState({
            releases: releases
          })
        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

  }

  /**
   * Renders the component.
   * @returns the html component.
   */
  public render(): JSX.Element {
    // Extract the values from state.
    const { releases } = this.state;

    // Generate the component.
    return <div className="flex flex-col flex-grow p-2 space-y-2 max-w-4xl">
      <header className="print:hidden">
        {/* Page title */}
        <h1 className="border-b-2 border-gray-300 font-bold text-2xl text-indigo-900">
          Changelog
        </h1>
      </header>
      <header
        className="p-2 rounded-lg bg-white shadow print:shadow-none flex sm:flex-row flex-col print:flex-row ">
        {/* About */}
        <div className="shadow p-2 rounded-lg bg-gray-50 sm:w-72 print:w-72 sm:mr-2 print:mr-2 flex-grow">
          <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
            About the project
          </h2>
          <div className="mt-2 pr-2 flex flex-row flex-wrap -mr-2 text-justify">
          </div>
        </div>
        {/* Libraries */}
        <div className="shadow p-2 rounded-lg bg-gray-50 sm:w-72 print:w-72 mt-2 sm:mt-0 print:mt-0 flex-grow">
          <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
            Libraries and Resources
          </h2>
          <div className="mt-2 flex flex-row justify-evenly">
            <div className="flex-grow border-r mr-2">
              <ul className="list-disc list-inside text-indigo-600 underline">
                <li>
                  <a rel="noreferrer noopener"
                    href="https://reactjs.org/" target="_blank">
                    React <span className="text-xs">17.0.2</span>
                  </a>
                </li>
                <li>
                  <a rel="noreferrer noopener"
                    href="https://reactrouter.com/" target="_blank">
                    React Router<span className="text-xs">5.2.0</span>
                  </a>
                </li>
                <li>
                  <a rel="noreferrer noopener"
                    href="https://day.js.org/" target="_blank">
                    DayJS <span className="text-xs">1.10.6</span>
                  </a>
                </li>
                <li>
                  <a rel="noreferrer noopener"
                    href="https://www.typescriptlang.org/" target="_blank">
                    Typescript <span className="text-xs">4.3.5</span>
                  </a>
                </li>
                <li>
                  <a rel="noreferrer noopener"
                    href="https://tailwindcss.com/" target="_blank">
                    TailwindCSS <span className="text-xs">17.0.2</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex-grow">
              <ul className="list-disc list-inside text-indigo-600 underline">
                <li>
                  <a rel="noreferrer noopener"
                    href="https://heroicons.com/" target="_blank">
                    heroicons
                  </a>
                </li>
                <li>
                  <a rel="noreferrer noopener"
                    href="https://iconmonstr.com/" target="_blank">
                    iconmonstr
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header >
      {/* Main */}
      <main className="flex-grow place-self-stretch">
        {/* Loop throught the changelogs entries */}
        {
          releases.map((release) =>
            <Release release={release} />)
        }
      </main>
    </div>;
  }
}

/**
 * Export the component.
 */
export default Resume;