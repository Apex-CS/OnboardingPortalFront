import { useState } from "react";
import { Button, InputText, InputTextArea } from "../../components";

interface CategoryProps {}
const Category = ({}: CategoryProps) => {
  const onSubmitHandlerEvent = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /**
     * Event to push new Category
     */
  };

  const [categoryname, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div>
      <div>
        <form onSubmit={onSubmitHandlerEvent} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <InputText
              value={categoryname}
              setValue={setCategoryName}
              placeHolder="Name"
              label="Name"
              classNameContainer={`flexitems center mt-4`}
              customClassInput={`w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 mr-3 p-2.5`}
            />
            <InputTextArea
              value={description}
              setValue={setDescription}
              placeHolder="Name"
              label="Name"
            />
            <Button label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Category;
