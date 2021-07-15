import ILanguage from './language.interface';

const Language = (props: { language: ILanguage }) => {
  return (
    <div>
      <p className="mr-4">
        {/* Brazilian Portuguese */}
        {props.language.language === 'Portugues' && <span>🇧🇷</span>}
        {/* USA English */}
        {props.language.language === 'English' && <span>🇺🇸</span>}
        {/* The language */}
        <span className="pl-2 font-bold">{props.language.language}</span>:&nbsp;
        <span>{props.language.fluency}</span>
      </p>
    </div>
  );
};

/**
 * Export the component.
 */
export default Language;
