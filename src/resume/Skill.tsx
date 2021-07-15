import ISkill from './skill.interface';

const Skill = (props: { skill: ISkill }) => {
  return (
    <div className="border-b print:shadow-none">
      <h2 className="font-bold rounded-lg p-1 text-md bg-gray-100 print:bg-white">{props.skill.name}</h2>
      <span className="text-sm print:text-xs">{props.skill.keywords?.join(', ')}</span>
    </div>
  );
};

/**
 * Export the component.
 */
export default Skill;
