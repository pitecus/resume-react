import Changes from './Changes';
import IRelease from './release.interface';

const Release = (props: { release: IRelease }) => {
  return (
    <div className="rounded-lg bg-white shadow p-2 mb-2 print:shadow-none">
      <h2 className="border-b-2 border-gray-300 font-bold text-xl text-indigo-900">Release {props.release.version}</h2>
      <div className="mt-2 flex flex-row flex-wrap -mr-2">
        {props.release.changes.map((change) => (
          <Changes type={change.type} changes={change.changes} key={change.type} />
        ))}
      </div>
    </div>
  );
};

/**
 * Export the function.
 */
export default Release;
