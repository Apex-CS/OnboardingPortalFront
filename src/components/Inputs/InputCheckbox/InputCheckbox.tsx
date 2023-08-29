import { useEffect, useState } from "react";
import LabelSubtitle from "../../Labels/LabelSubTitle";

interface InputCheckBoxProps {
  value: boolean;
  handlerInputCheck: (value: boolean) => void;
  label?: string;
  subLabelFlag?: boolean;
  disabled?: boolean;
}

const InputCheckBox = ({
  value,
  handlerInputCheck,
  label,
  subLabelFlag = false,
  disabled,
}: InputCheckBoxProps) => {
  const [checkValue, setcheckValue] = useState(false);
  useEffect(() => {
    setcheckValue(value);
  }, [value]);

  const onHandlerCkeckValue = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: boolean
  ) => {
    setcheckValue(!checkValue);
    handlerInputCheck(!checkValue);
  };

  return (
    <div className="flex w-full items-center">
      {label && <LabelSubtitle textSize="text-sm" subtitle={label + ":"} />}
      <input
        disabled={disabled}
        id="link-checkbox"
        type="checkbox"
        checked={checkValue}
        onChange={(e) => onHandlerCkeckValue(e, checkValue)}
        className="w-4 ml-2 mr-1 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="link-checkbox"
        className="text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {subLabelFlag && (checkValue ? "Done" : "Pending")}
      </label>
    </div>
  );
};

export default InputCheckBox;
