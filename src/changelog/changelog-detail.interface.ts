interface IChangelogDetail {
  commiter: string;
  date: string;
  message: {
    type: string;
    scope: string;
    subject: string;
  };
}

/**
 * Export the interface.
 */
export default IChangelogDetail;
