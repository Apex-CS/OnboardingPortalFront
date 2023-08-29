import { useContext, useEffect, useState } from "react";
import {
  InputCheckBox,
  InputDate,
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../components";
import { CategoriExampleData } from "../../../resources/data/TaskData";
import ComentList from "./ComentList";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { ParamsContext, ParamsType } from "../context/FormContext";

type OnSubmitPromise = (updateForm: ParamsType) => Promise<void>;

interface FormTaskPropst {
  onSubmitHandler: OnSubmitPromise;
  flagPage: string;
}

const inputSelecContainerClass = `w-full mr-2`;

const FormTask = ({ onSubmitHandler, flagPage }: FormTaskPropst) => {
  const flagEditInputs = flagPage === "view";
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([""]);
  const [categori, setCategori] = useState({});
  const [creationDate, setCreationDate] = useState(new Date());
  const [completionDate, setCompletionDate] = useState(new Date());
  const [completed, setCompleted] = useState(false);
  const [required, setRequired] = useState(false);

  const { params, setParams } = useContext(ParamsContext);

  const handlerInputCheckRequired = (value: boolean) => {
    setRequired((preValue) => !preValue);
  };

  const handlerInputCheckCompleted = (value: boolean) => {
    setCompleted((preValue) => !preValue);
  };

  useEffect(() => {
    setCategories(CategoriExampleData);
  }, []); // Load just once time to load data

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setName(params.name);
      setDescription(params.description);
      setCategori({
        id: 0,
        name: "string",
        description: "string",
      });
      setCreationDate(params.creationDate);
      setCompletionDate(params.completionDate);
      setCompleted(params.completed);
      setRequired(params.isRequired);
    }
  }, [params]);

  const onSubmitHandlerEvent = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const updateData = handleUpdateParams();
    handleUpdateParams();
    try {
      await onSubmitHandler(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateParams = () => {
    const updatedParams: ParamsType = {
      user: {},
      name: name,
      taskId: 0,
      description: description,
      categoryId: {
        id: 0,
        name: "string",
        description: "string",
      },
      creationDate: creationDate,
      completionDate: completionDate,
      completed: completed,
      isRequired: required,
    };
    setParams(updatedParams);
    return updatedParams;
  };

  return (
    <Provider store={store}>
      <div>
        <form onSubmit={onSubmitHandlerEvent} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <InputText
              disabled={flagEditInputs}
              value={name}
              setValue={setName}
              placeHolder="Name"
              label="Name"
              classNameContainer={`flexitems center mt-4`}
              customClassInput={`w-full bg-gray-100 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 mr-3 p-2.5`}
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <InputTextArea
              id="description"
              label="Description"
              value={description}
              setValue={setDescription}
              disabled={flagEditInputs}
            />
          </div>
          {/* <div className="relative z-0 w-1/3 pr-4 mb-6 group">
            <InputSelect
              disabled={flagEditInputs}
              id="categiries-input"
              label="Category"
              value={categori}
              setValue={setCategori}
              data={categories}
              containerClass={inputSelecContainerClass}
            />
          </div> */}
          <div className="flex">
            <div className="relative z-0 w-1/3 pr-4 mb-6 group"></div>
            <div className="relative z-0 flex pl-4 w-2/3 mb-6 group">
              <div className=" flex w-full mr-4">
                <InputDate
                  disabled={flagEditInputs}
                  label="Creation Date"
                  dateValue={creationDate}
                  setDateValue={setCreationDate}
                />
              </div>

              <div className=" flex w-full ml-4">
                <InputDate
                  disabled={flagEditInputs}
                  label="Completation Date"
                  dateValue={completionDate}
                  setDateValue={setCompletionDate}
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 py-2 md:gap-6">
            <div className="relative flex flex-row z-0 w-full mb-6 group">
              <div className="mr-3 w-1/3">
                <InputCheckBox
                  disabled={flagEditInputs}
                  label={"Required"}
                  value={required}
                  handlerInputCheck={handlerInputCheckRequired}
                />
              </div>

              <div className="mx-3 w-1/3">
                <InputCheckBox
                  disabled={flagEditInputs}
                  label={"Completed"}
                  value={completed}
                  handlerInputCheck={handlerInputCheckCompleted}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-2.5 text-center dark:hover:bg-sky-600 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
        <div
          id="comment-div"
          className="flex flex-col w-full justify-center items-center"
        >
          <div
            className="w-full flex flex-col my-2 justify-center items-center"
            id="comments-box"
          >
            <ComentList />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default FormTask;
