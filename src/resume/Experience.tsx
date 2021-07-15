import DatePeriod from '../common/DatePeriod';
import IWork from './work.interface';

const Experience = (props: { work: IWork }) => {
  return (
    <div className="mt-4 print:mb-2">
      {/* ADP */}
      {props.work.company === 'ADP' && (
        <img width="24" height="24" alt="ADP Logo" className="float-left rounded-full w-6 shadow mr-3" src="assets/logo-adp.jpeg" />
      )}
      {/* Google */}
      {props.work.company === 'Google' && (
        <img width="24" height="24" alt="Google logo" className="float-left rounded-full w-6 shadow mr-3" src="assets/logo-google.png" />
      )}
      {/* NYT */}
      {props.work.company === 'The New York Times' && (
        <img
          width="24"
          height="24"
          alt="The New York Times logo"
          className="float-left rounded-full w-6 shadow mr-3"
          src="assets/logo-nyt.png"
        />
      )}
      {/* Company, position and period */}
      <div className="flex justify-between space-x-2">
        <h3 className="text-lg flex-grow">
          {props.work.company} - {props.work.position}
        </h3>
        <div className="text-sm pl-1 text-right print:whitespace-nowrap">
          <DatePeriod startDate={props.work.startDate} endDate={props.work.endDate}></DatePeriod>
        </div>
      </div>
      {/* Summary */}
      <h4 className="bg-gray-100 rounded-lg italic p-1 mb-1 print:bg-white print:px-0">{props.work.summary}</h4>
      {/* Highlights */}
      {props.work.highlights.map((highlight: string) => (
        <p className="text-sm print:text-xs" key={highlight}>
          {highlight}
        </p>
      ))}
    </div>
  );
};

/**
 * Export the function.
 */
export default Experience;
