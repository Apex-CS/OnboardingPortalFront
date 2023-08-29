interface LabelSubtitleProps {
  subtitle: string;
  customClass?: string;
  textSize?:
    | "text-sm"
    | "text-md"
    | "text-lg"
    | "text-xl"
    | "text-2xl"
    | "text-3xl";
}

const LabelSubtitle = ({
  subtitle,
  customClass = "text-black",
  textSize = "text-2xl",
}: LabelSubtitleProps) => {
  const defaultClass = `${textSize} font-bold tracking-tight  ${customClass}`;
  return <h1 className={defaultClass}>{subtitle}</h1>;
};

export default LabelSubtitle;
