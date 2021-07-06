import Change from './Change';
import IChangelogDetail from "./changelog-detail.interface";
import ICommitType from "./commit-type.interface";
import commitTypes from './commit-types.json';

const Changes = (props: {
  type: string;
  changes: IChangelogDetail[];
}) => {
  /**
   * Commit type.
   */
  const localCommitTypes: { [commitType: string]: ICommitType } = commitTypes;

  return <div className="shadow p-2 rounded-lg bg-gray-50 sm:w-72 print:w-72 mr-2 mt-2 flex-grow">
    <h3 className="text-lg text-gray-700 border-b-2">
      {localCommitTypes[props.type].emoji}
      <span className="ml-2">{localCommitTypes[props.type].title}</span>
    </h3>
    <ul className="list-disc list-inside">
      {/* Commit type */}
      {
        props.changes.map((change) =>
          <Change change={change} key={change.date} />
        )
      }
    </ul>
  </div>
};

/**
 * Export the function.
 */
export default Changes;