interface ButtonProps {
  onClickHandler?: () => void;
  label?: string;
  customClass?: string;
  isPillStyle?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  icon?: any;
  title?: string;
}

function Button({
  onClickHandler,
  label,
  customClass = `bg-yellow-600 w-80 px-5 py-2.5 mb-2`,
  isPillStyle = false,
  type = "button",
  icon,
  title = "",
}: ButtonProps) {
  const defaultClass = `focus:outline-none text-white focus:ring-4 focus:ring-purple-300 font-medium rounded-lg ${customClass}`;
  return (
    <button
      title={title}
      type={type}
      onClick={onClickHandler}
      className={defaultClass}
    >
      {label}
      {icon && <span className="w-52 h-10">{icon}</span>}
    </button>
  );
}

export default Button;
