import LabelSubtitle from "../../Labels/LabelSubTitle";

interface InputTextAreaProps {
  name?: string;
  label: string;
  id?: string;
  placeHolder?: string;
  required?: boolean;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  customClassLabel?: string;
  disabled?: boolean;
}

function InputTextArea({
  name = "",
  label,
  id = "",
  placeHolder = "",
  required = false,
  value,
  setValue,
  customClassLabel = "",
  disabled,
}: InputTextAreaProps) {
  const classLabel = `mb-1  mr-2 ${customClassLabel} `;

  // This function is called when the input changes
  const inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const enteredValue = event?.target?.value;
    setValue(enteredValue ? enteredValue : "");
  };

  return (
    <div>
      <LabelSubtitle
        customClass={classLabel}
        textSize="text-md"
        subtitle={label + ""}
      />
      <textarea
        id={id}
        disabled={disabled}
        name={name}
        rows={4}
        className="block p-2.5 w-full text-sm  bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
        value={value}
        placeholder={placeHolder}
        required={required}
        onChange={inputHandler}
      />
    </div>
  );
}

export default InputTextArea;
