import { useContext, useEffect, useState } from "react";
import {
  InputDate,
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../components";
import CommentList from "./CommentList";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { ParamsContext, ParamsType } from "../context/FormContext";
import { useFetch } from "../../../hooks/useFetch";
import { Categories } from "../../../types/types";
import { URL_GET_CATEGORY } from "../../../resources/data/APIPath";

type OnSubmitPromise = (updateForm: ParamsType) => Promise<void>;

interface FormTaskProps {
  onSubmitHandler: OnSubmitPromise;
  onCompleteHandler: OnSubmitPromise;
  flagPage: string;
  userId: number;
}

const inputSelectContainerClass = ` text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pr-2.5`;

const FormTask = ({
  onSubmitHandler,
  onCompleteHandler,
  flagPage,
  userId,
}: FormTaskProps) => {
  const { params, setParams } = useContext(ParamsContext);
  const flagEditInputs = flagPage === "view" || flagPage === "complete";

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const findCategoryByID = (idValue: number) => {
    const returnValue = arrayCategories.find(
      (element) => element.id === idValue
    );
    if (returnValue) {
      return returnValue;
    } else {
      return arrayCategories[0];
    }
  };
  const [taskId, setTaskId] = useState(params.taskId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([""]);
  const [category, setCategory] = useState<Categories>({} as Categories);
  const [creationDate, setCreationDate] = useState(params.creationDate);
  const [completionDate, setCompletionDate] = useState(params.completionDate);
  const [arrayCategories, setArrayCategories] = useState<Categories[]>([]);
  const [completed, setCompleted] = useState(false);
  const [required, setRequired] = useState(false);
  const { data: dataCategories, fetchData: fetchDataCategories } = useFetch(
    URL_GET_CATEGORY,
    "GET"
  );

  useEffect(() => {
    try {
      fetchDataCategories();
    } catch (error) {
      console.error("🚀  FetchCategories => error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load just once time to load data

  useEffect(() => {
    if (dataCategories) {
      const listCategories = dataCategories as Categories[];
      const listCategoriesString = listCategories.map(
        (item) => item.description
      );
      setArrayCategories(listCategories);
      setCategories(listCategoriesString);
    }
  }, [dataCategories]);

  useEffect(() => {
    if (Object.keys(params).length > 0) {
      setName(params.name);
      setDescription(params.description);
      setCreationDate(params.creationDate);
      setCompletionDate(params.completionDate);
      setCompleted(params.completed);
      setRequired(params.isRequired);
      setTaskId(params.taskId);
    }

    if (Object.keys(params).length > 0 && arrayCategories.length > 0) {
      setCategory(findCategoryByID(params.categoryId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, arrayCategories]);

  useEffect(() => {
    const newUpdateParams = params;
    newUpdateParams.name = name;
    newUpdateParams.description = description;
    setParams(newUpdateParams);
  }, [name, description, params, setParams]);

  const onChangeEventCategory = (value: string) => {
    const categoriesArray = dataCategories as Categories[];
    const categoryValue = categoriesArray.find(
      (element) => element.description === value
    );
    if (categoryValue) {
      setCategory(categoryValue);
      const newUpdateParams = params;
      newUpdateParams.categoryId = categoryValue.id;
      setParams(newUpdateParams);
    }
  };

  const onSubmitHandlerEvent = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const updateData = handleUpdateParams();
    try {
      await onSubmitHandler(updateData);
    } catch (error) {
      console.error(error);
    }
  };

  const onCompleteHandlerEvent = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const updateData = handleUpdateParams();
    try {
      await onCompleteHandler(updateData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateParams = () => {
    const updatedParams: ParamsType = {
      user: {},
      name: name,
      taskId: taskId,
      description: description,
      categoryId: category.id,
      creationDate: creationDate,
      completionDate: completionDate,
      completed: completed,
      isRequired: required,
    };
    setParams(updatedParams);
    return updatedParams;
  };

  const onChangeCompleteDateEvent = (newDate: Date) => {
    setCompletionDate(newDate);
    const newUpdateParams = params;
    newUpdateParams.completionDate = newDate;
    setParams(newUpdateParams);
  };

  const onChangeCreationDateEvent = (newDate: Date) => {
    setCreationDate(newDate);
    const newUpdateParams = params;
    newUpdateParams.completionDate = newDate;
    setParams(newUpdateParams);
  };

  return (
    <Provider store={store}>
      <div className="w-full">
        <form onSubmit={onSubmitHandlerEvent} className="w-full">
          <div className="relative z-0 w-full mb-6 group">
            <InputText
              disabled={flagEditInputs}
              value={name}
              setValue={setName}
              placeHolder="Name"
              label="Name"
              classNameContainer={`flex items-center mt-4`}
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
          <div className="flex">
            <div className="relative z-0 w-1/3 pr-4 mb-6 group">
              <InputSelect
                disabled={flagEditInputs}
                id="categories-input"
                label="Category"
                value={category?.description}
                onChangeEvent={onChangeEventCategory}
                data={categories}
                containerClass={inputSelectContainerClass}
              />
            </div>
            {params.completed === true && (
              <div className="relative z-0 flex pl-4 w-2/3 mb-6 group">
                <div className=" flex w-full mr-4">
                  <InputDate
                    disabled={flagEditInputs}
                    label="Creation Date"
                    dateValue={creationDate}
                    onChangeValue={onChangeCreationDateEvent}
                  />
                </div>

                <div className=" flex w-full ml-4">
                  <InputDate
                    disabled={flagEditInputs}
                    label="Completion Date"
                    dateValue={completionDate}
                    onChangeValue={onChangeCompleteDateEvent}
                  />
                </div>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-sky-400 hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-2.5 text-center dark:hover:bg-sky-600 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          {flagPage === "complete" && (
            <>
              <button
                onClick={async (
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  onCompleteHandlerEvent(event);
                }}
                type="button"
                className={`text-white ml-5
                  ${
                    completed
                      ? "bg-red-400 hover:bg-red-600 "
                      : "bg-green-400 hover:bg-green-600 "
                  }
                 bg-green-400 hover:bg-green-600 
                 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg w-full sm:w-auto px-10 py-2.5 text-center
                  dark:hover:bg-green-600 dark:focus:ring-green-800`}
              >
                {completed ? "Cancel Task" : "Complete Task"}
              </button>
            </>
          )}
        </form>
        <div
          id="comment-div"
          className="flex flex-col w-full justify-center items-center"
        >
          <div
            className="w-full flex flex-col my-2 justify-center items-center"
            id="comments-box"
          >
            <CommentList userId={userId} taskId={taskId} />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default FormTask;
