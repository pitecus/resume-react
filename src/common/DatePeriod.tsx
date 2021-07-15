import dayjs from 'dayjs';

const DatePeriod = (props: { startDate: string; endDate: string }) => {
  // Format start date.
  const start = dayjs(props.startDate).format('MMM/YYYY');

  // Format end date.
  let end = 'Current';
  if (props.endDate !== 'Current') {
    end = dayjs(props.endDate).format('MMM/YYYY');
  }

  return (
    <>
      {start}
      <br className="print:hidden" />
      <span className="hidden print:inline"> to </span>
      {end}
    </>
  );
};

/**
 * Export the component.
 */
export default DatePeriod;
