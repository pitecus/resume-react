import IChangelogDetail from "./changelog-detail.interface";

const Change = (props: {
  change: IChangelogDetail;
}) => {
  return <li>{props.change.message.subject}</li>;
};

/**
 * Export the function.
 */
export default Change;