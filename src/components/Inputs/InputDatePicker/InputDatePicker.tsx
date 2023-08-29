import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import LabelSubtitle from "../../Labels/LabelSubTitle";
interface InputDatePickerProps {
  setDateValue: React.Dispatch<React.SetStateAction<Date>>;
  dateValue: Date;
  label?: string;
  disabled?: boolean;
}

const InputDatePicker = ({
  setDateValue,
  dateValue,
  label,
  disabled,
}: InputDatePickerProps) => {
  /**
   *
   * @param value Type Date
   */
  const onChangeEvent = (value: any) => {
    setDateValue(value);
  };

  return (
    <div className="flex container flex-col ">
      {label && <LabelSubtitle textSize="text-md" subtitle={label} />}
      <DatePicker
        disabled={disabled}
        className={"bg-gray-100 rounded border border-white"}
        onChange={(value) => onChangeEvent(value)}
        value={dateValue}
      />
    </div>
  );
};

export default InputDatePicker;
