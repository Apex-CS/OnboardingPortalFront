import { ChangeEvent } from "react";
import "./InputFile.css";
interface InputFileProps {
  label: string;
  accept?: string;
  valueImage: File | undefined | string;
  setValueImage: React.Dispatch<
    React.SetStateAction<File | undefined | string>
  >;
}
function InputFile({
  label,
  accept = "image/png, image/jpeg",
  valueImage,
  setValueImage,
}: InputFileProps) {
  const id = "file_input";
  const defaultClassLabel =
    "block mb-2 text-sm font-medium text-gray-900 dark:text-white";
  const defaultClassButton =
    "block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValueImage(e.target.files[0]);
    }
  };

  const handlerImage = () => {
    if (typeof valueImage === "string") {
      return valueImage;
    } else if (valueImage) {
      return URL.createObjectURL(valueImage);
    }
  };

  return (
    <div className="flex w-full flex-col justify-start items-start">
      <label className={defaultClassLabel} htmlFor={id}>
        {label}
      </label>
      <input
        accept={accept}
        className={defaultClassButton}
        onChange={handleFileChange}
        id={id}
        type="file"
      />

      {valueImage && (
        <div className="flex justify-start items-center">
          <img
            id="poster-image-form"
            className="w-2/4 h-1/3"
            src={handlerImage()}
            alt=""
          />
        </div>
      )}
    </div>
  );
}

export default InputFile;
