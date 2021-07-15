import IAward from './award.interface';
import IBasics from './basics.interface';
import IEducation from './education.interface';
import IInterests from './interests.interface';
import ILanguage from './language.interface';
import IPublication from './publication.interface';
import IReference from './reference.interface';
import ISkill from './skill.interface';
import IVolunteer from './volunteer.interface';
import IWork from './work.interface';

interface IResume {
  awards: IAward[];
  basics: IBasics;
  education: IEducation[];
  interests: IInterests[];
  languages: ILanguage[];
  publications: IPublication[];
  references: IReference[];
  skills: ISkill[];
  volunteer: IVolunteer[];
  work: IWork[];
}

/**
 * Export the interface.
 */
export default IResume;
