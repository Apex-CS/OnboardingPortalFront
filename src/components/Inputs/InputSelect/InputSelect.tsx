import LabelSubtitle from "../../Labels/LabelSubTitle";

interface InputSelectProps {
  label?: string;
  id?: string;
  data: string[];
  containerClass?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeEvent?: (newValue: string) => void;
  disabled?: boolean;
}
function InputSelect({
  label = "",
  data,
  id = "inputSelect",
  containerClass,
  value,
  setValue,
  onChangeEvent,
  disabled = false,
}: InputSelectProps) {
  const defaultClassSelect = `text-md bg-gray-100 rounded <py-2></py-2> my-1 w-full mr-2`;

  // This function is triggered when the select changes
  const onChangeInputSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (onChangeEvent) {
      onChangeEvent(value);
    }
    setValue(value);
  };

  return (
    <div className={containerClass}>
      <LabelSubtitle textSize="text-md" subtitle={label + ""} />
      <select
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChangeInputSelect}
        className={defaultClassSelect}
      >
        {data.map((item) => (
          <option selected>{item}</option>
        ))}
      </select>
    </div>
  );
}

export default InputSelect;
