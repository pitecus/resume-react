import IChangelogDetail from './changelog-detail.interface';

/**
 * Release.
 */
interface IRelease {
  /**
   * Version.
   */
  version: string;

  /**
   * Changes grouped by type.
   */
  changes: {
    /**
     * Change type.
     */
    type: string;

    /**
     * Changes.
     */
    changes: IChangelogDetail[];
  }[];
}

/**
 * Export the interface.
 */
export default IRelease;
