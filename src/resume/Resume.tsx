import Education from './Education';
import Experience from "./Experience";
import IProfile from "./profile.interface";
import IPublication from "./publication.interface";
import IRelease from "./release.interface";
import IResume from "./resume.interface";
import IWork from './work.interface';
import Language from './Language';
import Profile from "./Profile";
import Publication from "./Publication";
import QRCode from 'qrcode';
import React from "react";
import Skill from "./Skill";
import dayjs from 'dayjs';

/**
 * Resume component.
 */
class Resume extends React.Component<
  {},
  {
    error: null,
    /**
     * List of filtered work experience.
     */
    filteredExperience: IWork[],
    isExperienceFiltered: 'true' | 'false',
    isLoaded: boolean,
    qrCode: string | null,
    release: IRelease | null,
    resume: IResume | null
  }
> {
  /**
   * The filtered date.
   */
  private readonly filterDate: string;

  /**
   * Constructor for the component.
   * @param props properties.
   */
  public constructor(props: {}) {
    super(props);
    this.state = {
      error: null,
      filteredExperience: [],
      isExperienceFiltered: 'true',
      isLoaded: false,
      qrCode: null,
      release: null,
      resume: null
    };

    // Set the filter date.
    this.filterDate = dayjs()
      .subtract(7, 'year')
      .format('YYYY-MM-DD');

    // Bind events.
    this.handleFilterExperience = this.handleFilterExperience.bind(this);
  }

  /**
   * Called immediately after a component is mounted. Setting state here will trigger re-rendering.
   */
  public componentDidMount(): void {
    // Retrieve the resume.
    fetch("/assets/resume.json")
      // Extract only the json portion of the request.
      .then(res => res.json())
      // Process the result.
      .then(
        (result: IResume) => {
          // Set the state.
          this.setState({
            isLoaded: true,
            resume: result
          });

          // Filter the work.
          this.filterWorkExperience(true);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    // Retrieve the release.
    fetch("/assets/release.json")
      // Extract only the json portion of the request.
      .then(res => res.json())
      // Process the result.
      .then(
        (result: IRelease) => {
          this.setState({
            release: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );

    // Generate a QR code for printed version.
    QRCode.toDataURL(
      window.location.href, {
      errorCorrectionLevel: 'low'
    }, (error, url) => {
      this.setState({
        qrCode: url
      });
    });
  }

  /**
   * Handle the filtering the work experience.
   */
  public handleFilterExperience(): void {
    // Check if filter is needed.
    const shouldFilter: boolean = this.state.isExperienceFiltered === 'false';

    // Switch the state value.
    this.setState({
      isExperienceFiltered: shouldFilter ? 'true' : 'false'
    });

    // Filter.
    this.filterWorkExperience(shouldFilter);
  }

  /**
   * Renders the component.
   * @returns the html component.
   */
  public render(): JSX.Element {
    const { release, resume, filteredExperience, qrCode } = this.state;
    return <>
      {
        resume !== null &&
        <div className="flex flex-col justify-between p-2 space-y-2 min-h-screen max-w-4xl">
          <header className="print:hidden">
            {/* Page title */}
            <h1 className="border-b-2 border-gray-300 font-bold text-2xl text-indigo-900 flex justify-between items-end">
              Resume
              {
                release !== null &&
                <span className="text-gray-500 text-xs">v{release.version} </span>
              }
            </h1>
          </header>
          {/* Header */}
          <header
            className="p-2 rounded-lg bg-white shadow print:shadow-none flex sm:flex-row flex-col sm:space-x-4 print:flex-row print:space-x-4">
            {/* Photo, location and contacts */}
            <div className="whitespace-nowrap sm:border-r sm:pr-2 text-center sm:profile-card">
              <img className="rounded-full shadow-md border-indigo-200 print:hidden m-auto mt-2 border"
                width="202"
                height="202"
                alt="portrait"
                src="assets/leo-meirelles.jpeg" />
              <div className="sm:pb-0 pb-4 print:pb-0">
                {/* Name */}
                <h1 className="font-semibold text-2xl text-indigo-900">{resume.basics.name}</h1>
                {/* Label and pronoun */}
                <div className="flex justify-between">
                  {/* Label */}
                  <p>{resume.basics.label}</p>
                  {/* Pronoun */}
                  <p className="text-gray-500">{resume.basics.pronoun}</p>
                </div>
                {/* Location */}
                <p className="text-gray-500 text-sm mb-2">
                  {resume.basics.location?.city},
                  &nbsp;
                  {resume.basics.location?.region},
                  &nbsp;
                  {resume.basics.location?.countryCode}
                </p>
                {/* Phone contact */}
                <p className="flex pb-1 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.5 17.311l-1.76-3.397-1.032.505c-1.12.543-3.4-3.91-2.305-4.497l1.042-.513-1.747-3.409-1.053.52c-3.601 1.877 2.117 12.991 5.8 11.308l1.055-.517z" />
                  </svg>
                  <a className="pl-2"
                    rel="noopener noreferrer"
                    href={`tel:${resume.basics.phone}`}>
                    {resume.basics.phone}
                  </a>
                </p>
                {/* Email contact */}
                <p className="flex pb-1 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24">
                    <path
                      d="M12 2.02c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 12.55l-5.992-4.57h11.983l-5.991 4.57zm0 1.288l-6-4.629v6.771h12v-6.771l-6 4.629z" />
                  </svg>
                  <a className="pl-2"
                    rel="noopener noreferrer"
                    href={`mailto:${resume.basics.email}`}>
                    {resume.basics.email}
                  </a>
                </p>
                {/* Website */}
                <p className="flex text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    className="inline h-6 w-6 stroke-current text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <a className="pl-2"
                    rel="noopener noreferrer"
                    href={resume.basics.website}>
                    {resume.basics.website}
                  </a>
                </p>
              </div>
            </div>
            {/* Summary and links */}
            <div className="flex flex-col w-full justify-between">
              {/* Summary */}
              <p className="text-md sm:text-xl print:text-sm">
                {
                  qrCode && <img className="float-right hidden print:inline"
                    width="50"
                    height="50"
                    alt="QR code"
                    src={qrCode} />
                }
                {resume.basics.summary}
              </p>
              {/* Links and version */}
              <div className="flex flex-row justify-between">
                <div className="flex flex-row content-end flex-wrap text-indigo-600">
                  {/* Links */}
                  {
                    resume.basics.profiles &&
                    resume.basics.profiles.map((profile: IProfile) =>
                      <Profile key={profile.network} profile={profile} />
                    )
                  }
                </div>
                {/* Version */}
                {
                  release !== null &&
                  <div className="flex flex-grow items-end justify-end">
                    <span className="text-right -mb-1 text-gray-500 text-xs hidden print:inline">v{release.version} </span>
                  </div>
                }
              </div>
            </div>
          </header >

          {/* Main */}
          <main className="flex-grow place-self-stretch">
            {/* Professional Experience */}
            {
              filteredExperience != null &&
              <div className="rounded-lg bg-white shadow p-2 mb-2 print:pt-0 print:-mt-2 print:shadow-none">
                <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900 flex justify-between">
                  {/* Section title */}
                  <span>Experience</span>
                  <label className="flex items-center text-sm print:hidden">
                    <input type="checkbox"
                      value={this.state.isExperienceFiltered}
                      checked={this.state.isExperienceFiltered === 'true'}
                      onChange={this.handleFilterExperience}
                      className="form-checkbox h-4 w-4 text-indigo-500" />
                    <span className="ml-2">Whitin last 7 years</span>
                  </label>
                </h2>
                {
                  filteredExperience.map((work: IWork, index: number, array: IWork[]) =>
                    <Experience work={work} key={work.startDate} isLast={index + 1 === array.length} />)
                }
              </div>
            }
            {/* Publications and conferences */}
            {
              resume.publications !== null &&
              <div className="rounded-lg bg-white shadow p-2 mb-2 print:pt-0 print:-mt-2 print:shadow-none">
                <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
                  <span>Conferences</span>
                </h2>
                {
                  resume.publications.map((publication: IPublication) =>
                    <Publication publication={publication} key={publication.publisher}></Publication>
                  )
                }
              </div>
            }
            {/* Education and languages*/}
            {
              (resume.education !== null || resume.languages !== null) &&
              <div className="rounded-lg bg-white shadow p-2 mb-2 print:pt-0 print:-mt-2 print:shadow-none">
                {/* Education */}
                {
                  resume.education !== null &&
                  <div>
                    <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
                      Education
                    </h2>
                    {
                      resume.education.map(education =>
                        <Education education={education} key={education.area}></Education>
                      )
                    }
                  </div>
                }
                {/* Languages */}
                {
                  resume.languages !== null &&
                  <div>
                    <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
                      Languages
                    </h2>
                    <div className="mt-2 flex flex-row flex-wrap">
                      {
                        resume.languages.map(language =>
                          <Language language={language} key={language.language}></Language>
                        )
                      }
                    </div>
                  </div>
                }
              </div>
            }
            {/* Technical skills */}
            {
              resume.skills !== null &&
              <div className="rounded-lg bg-white shadow p-2 print:shadow-none">
                <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">
                  Technical Skills
                </h2>
                <dl>
                  {
                    resume.skills.map(skill =>
                      <Skill skill={skill} key={skill.name}></Skill>
                    )
                  }
                </dl>
              </div>
            }
          </main>
          {/* Footer */}
          <footer className="rounded-lg bg-white shadow p-2 flex space-x-6 text-sm text-indigo-600 font-bold print:hidden">
            {/* Github link */}
            <a href="https://github.com/pitecus/resume-react"
              className="whitespace-nowrap"
              target="_blank"
              rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg"
                className="inline mr-1"
                width="24"
                height="24"
                viewBox="0 0 24 24">
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 6c-3.313 0-6 2.686-6 6 0 2.651 1.719 4.9 4.104 5.693.3.056.396-.13.396-.289v-1.117c-1.669.363-2.017-.707-2.017-.707-.272-.693-.666-.878-.666-.878-.544-.373.041-.365.041-.365.603.042.92.619.92.619.535.917 1.403.652 1.746.499.054-.388.209-.652.381-.802-1.333-.152-2.733-.667-2.733-2.965 0-.655.234-1.19.618-1.61-.062-.153-.268-.764.058-1.59 0 0 .504-.161 1.65.615.479-.133.992-.199 1.502-.202.51.002 1.023.069 1.503.202 1.146-.776 1.648-.615 1.648-.615.327.826.121 1.437.06 1.588.385.42.617.955.617 1.61 0 2.305-1.404 2.812-2.74 2.96.216.186.412.551.412 1.111v1.646c0 .16.096.347.4.288 2.383-.793 4.1-3.041 4.1-5.691 0-3.314-2.687-6-6-6z" />
              </svg>
              <p className="inline align-middle">Git Repo</p>
            </a>
            {/* Build status badge */}
            <div className="flex flex-col justify-center">
              <img src="https://github.com/pitecus/resume-react/actions/workflows/node.js.yml/badge.svg"
                width="111"
                height="20"
                alt="GitHub actions build status badge" />
            </div>
          </footer>
        </div >
      }
    </>;
  };

  /**
   * Filter the work experience.
   * @param shouldFilter If should perform filter
   */
  private filterWorkExperience(shouldFilter: boolean): void {
    // Return without work.
    if (this.state.resume?.work == null) {
      return;
    }

    // The filtered experience.
    let filteredExperience: IWork[];

    // Filter.
    if (shouldFilter) {
      filteredExperience = this.state.resume?.work
        .filter((work) => work.endDate > this.filterDate);
    } else {
      // No filter.
      filteredExperience = this.state.resume?.work;
    }

    // Update state.
    this.setState({
      filteredExperience
    });
  }
};

/**
 * Export the function.
 */
export default Resume;