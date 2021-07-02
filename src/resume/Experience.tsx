import IWork from "./work.interface";

const Experience = (props: {
  work: IWork
}) => {
  return <>
    <div className="mt-2 border-b">
      {/* ADP */}
      {
        props.work.company === 'ADP' &&
        <img width="24"
          height="24"
          alt="ADP Logo"
          className="float-left rounded-full w-6 shadow mr-3"
          src="assets/logo-adp.jpeg" />
      }
      {/* Google */}
      {
        props.work.company === 'Google' &&
        <img width="24"
          height="24"
          alt="Google logo"
          className="float-left rounded-full w-6 shadow mr-3"
          src="assets/logo-google.png" />
      }
      {/* NYT */}
      {
        props.work.company === 'The New York Times' &&
        <img width="24"
          height="24"
          alt="The New York Times logo"
          className="float-left rounded-full w-6 shadow mr-3"
          src="assets/logo-nyt.png" />
      }
      {/* Company, position and period */}
      <div className="flex justify-between space-x-2">
        <h3 className="font-bold text-lg w-full">
          {props.work.company} - {props.work.position}
        </h3>
        <div className="text-sm w-20 pl-1 sm:w-36 sm:text-right print:w-36">
          {props.work.startDate}
          <span className="hidden sm:inline">-</span>
          {
            props.work.endDate === 'Current' &&
            <span>
              Current
            </span>
          }
          {
            props.work.endDate !== 'Current' &&
            <span>
              {props.work.endDate}
            </span>
          }
        </div>
      </div>
      {/* Summary */}
      <h4 className="bg-gray-100 rounded-lg italic p-1 mb-1 print:px-0">{props.work.summary}</h4>
      {/* Highlights */}
      {
        props.work.highlights.map((highlight: string) =>
          <p className="mb-2 text-sm print:text-xs">
            {highlight}
          </p>)
      }
    </div>
  </>
};


/**
 * Export the function.
 */
export default Experience;