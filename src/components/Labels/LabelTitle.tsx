interface LabelTitleProps {
  title: string;
  customClass?: string;
  textSize?:
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl";
}
const LabelTitle = ({ title, customClass, textSize }: LabelTitleProps) => {
  const defaultClass = `${textSize} font-bold tracking-tight  ${customClass}`;
  return (
    <div className="flex justify-start items-center border-l-4 border-sky-400">
      <h1 className={defaultClass}>{title}</h1>
    </div>
  );
};

export default LabelTitle;
