import ILocation from './location.interface';
import IProfile from './profile.interface';

/**
 * Basic resume information.
 */
interface IBasics {
  email: string;
  label: string;
  location: ILocation;
  name: string;
  phone: string;
  picture: string;
  profiles?: IProfile[] | null;
  pronoun: string;
  summary: string;
  website: string;
}

/**
 * Export the interface.
 */
export default IBasics;
