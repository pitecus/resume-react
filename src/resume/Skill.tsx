import ISkill from "./skill.interface"

const Skill = (props: {
  skill: ISkill
}) => {
  return <>
    <dt className="font-bold text-lg mb-1 mt-2">{props.skill.name}</dt>
    <dd className="text-sm">
      {props.skill.keywords?.join(', ')}
    </dd>
  </>
}

/**
 * Export the component.
 */
export default Skill;