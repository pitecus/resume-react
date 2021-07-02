import IPublication from "./publication.interface"

const Publication = (props: {
  publication: IPublication
}) => {
  return <div className="mt-2">
    {/* ADP */}
    {
      props.publication.publisher === 'ADP Global Product & Development Connect' &&
      <img width="24"
        height="24"
        alt="ADP Logo"
        className="float-left rounded-full w-6 shadow mr-3"
        src="assets/logo-adp.jpeg" />
    }
    {/* Conference name */}
    <div className="flex justify-between space-x-2">
      <h3 className="font-bold text-lg w-full">
        {props.publication.publisher}
      </h3>
    </div>
    {/* Title */}
    <h4 className="bg-gray-100 rounded-lg italic p-1 mb-1 print:px-0 flex justify-between">
      <span>{props.publication.name}</span>
      <span className="not-italic text-sm">{props.publication.releaseDate}</span>
    </h4>
    {/* Summary */}
    <p className="mb-2 text-sm print:text-xs">
      {props.publication.summary}
    </p>
  </div>
}

/**
 * Export the component.
 */
export default Publication;