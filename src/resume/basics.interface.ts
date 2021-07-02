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
  summary: string;
  website: string;
}

export default IBasics;
