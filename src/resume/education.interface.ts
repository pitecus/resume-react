interface IEducation {
  area: string;
  courses?: (string)[] | null;
  endDate: string;
  gpa: string;
  institution: string;
  startDate: string;
  studyType: string;
}

export default IEducation;