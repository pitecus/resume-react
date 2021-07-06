import DatePeriod from '../common/DatePeriod';
import IEducation from "./education.interface"

const Education = (props: {
  education: IEducation
}) => {
  return <div className="mt-2">
    {/* PUCRS */}
    {
      props.education.institution === 'Pontifícia Universidade Católica (PUCRS)' &&
      <img width="24"
        height="24"
        alt="ADP Logo"
        className="float-left rounded-full w-6 shadow mr-3"
        src="assets/logo-pucrs.png" />
    }
    <div className="flex justify-between space-x-2">
      <h3 className="font-bold text-lg flex-grow">
        {props.education.institution}
      </h3>
      <div className="text-sm pl-1 text-right print:whitespace-nowrap">
        <DatePeriod startDate={props.education.startDate} endDate={props.education.endDate}></DatePeriod>
      </div>
    </div>
    <h4 className="p-1 mb-1">{props.education.studyType} {props.education.area}</h4>
  </div>
}

/**
 * Export the component.
 */
export default Education;