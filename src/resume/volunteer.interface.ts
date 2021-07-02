interface IVolunteer {
  endDate: string;
  highlights?: (string)[] | null;
  organization: string;
  position: string;
  startDate: string;
  summary: string;
  website: string;
}

/**
 * Export the interface.
 */
export default IVolunteer;