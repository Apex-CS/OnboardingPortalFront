import { useEffect, useState } from "react";
import FormTask from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { ParamsContext, ParamsType } from "./context/FormContext";
import { FormTaskEditExampleData } from "../../resources/data/TaskData";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components";
const GO_BACK_PAGE_VALUE = -1;
const Task = () => {
  let { taskId } = useParams();
  const userId = 3; //temporaly
  const navigate = useNavigate();
  const [flagPage, setFlagPage] = useState("");
  const URL_API_TASK = `https://onportal.azurewebsites.net/api/v1/task`;
  const URL_API_COMPLETE_TASK = taskId
    ? `https://onportal.azurewebsites.net/api/v1/task/completed?taskId=${taskId.substring(
        1,
        taskId.length
      )}`
    : "";

  const url = window.location.href;
  const [params, setParams] = useState<ParamsType>({} as ParamsType);
  const urlAPIGet = taskId
    ? `${URL_API_TASK}/${taskId.substring(1, taskId.length)}`
    : "";

  const [urlComplte, setUrlComplte] = useState(URL_API_COMPLETE_TASK);
  const {
    data: dataGet,
    error: errorGet,
    isLoading: loadingGet,
    fetchData: fetchDataGet,
  } = useFetch(urlAPIGet, "GET");

  const {
    data: dataPost,
    error: errorPost,
    isLoading: loadingPost,
    fetchData: fetchDataPost,
    fetchDataResponse: fetchDataResponseTask,
  } = useFetch(URL_API_TASK, "POST");

  const {
    data: dataPut,
    error: errorPut,
    isLoading: loadingPut,
    fetchData: fetchDataPut,
  } = useFetch(URL_API_TASK, "PUT");

  const {
    data: dataCompleteTask,
    error: errorCompleteTask,
    isLoading: loadingCompleteTask,
    fetchData: fetchDataCompleteTask,
  } = useFetch(urlComplte, "PUT");

  const getTaskData = async (idTask: string) => {
    const response = FormTaskEditExampleData;
    try {
      await fetchDataGet();
    } catch (error) {
      console.error("This is the error:", error);
      return response;
    }

    return response;
  };

  const updateParams = async (newParams: ParamsType) => {
    setParams(newParams);
  };

  const validateIDParam = async () => {
    if (taskId) {
      await getTaskData(taskId);
    }
  };

  const onSubmitEditHandler = async (paramsValue: ParamsType) => {
    const completedDate = params.completionDate
      ? new Date(params.completionDate).toISOString()
      : null;

    const paramsData = {
      taskId: params.taskId,
      name: params.name,
      description: params.description,
      isRequired: params.isRequired,
      completed: params.completed,
      creationDate: params.creationDate,
      completionDate: completedDate,
      comments: "example of comments",
      categoryId: params.categoryId,
      userId: userId,
    };
    console.log(
      "🚀 ~ file: Task.tsx:95 ~ onSubmitEditHandler ~ paramsData:",
      paramsData
    );

    try {
      await fetchDataPut(paramsData);
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitEditHandler ~ error:",
        error
      );
    }
  };

  const onCompleteTaskHandler = async () => {
    try {
      await fetchDataCompleteTask();
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitEditHandler ~ error:",
        error
      );
    }
  };

  const onSubmitCreateHandler = async () => {
    const paramsData = {
      taskId: null,
      name: params.name,
      description: params.description,
      isRequired: null,
      completed: false,
      creationDate: new Date(),
      completionDate: null,
      comments: "example of comments",
      categoryId: params.categoryId,
      userId: userId,
    };
    try {
      const response = await fetchDataResponseTask(paramsData);

      if (response.error) {
        return;
      }
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitCreateHandler ~ error:",
        error
      );
    }
  };

  const onSubmitHandler = async () => {
    if (taskId) {
      // Edit a existing Task
      await onSubmitEditHandler(params);
      navigate(GO_BACK_PAGE_VALUE);
    } else {
      // Create a new Task
      await onSubmitCreateHandler();
      console.error(errorPost);
      if (errorPost === undefined || errorPost === null) {
        navigate(GO_BACK_PAGE_VALUE);
      }
    }
  };

  const onCompleteHandler = async () => {
    await onCompleteTaskHandler();
    navigate(GO_BACK_PAGE_VALUE);
  };

  useEffect(() => {
    if (url.includes("/edit")) {
      setFlagPage("edit");
    } else if (url.includes("/view")) {
      setFlagPage("view");
    } else if (url.includes("/complete")) {
      setFlagPage("complete");
    }
    validateIDParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Execute just in the first render

  useEffect(() => {
    if (dataGet) {
      const responseData = dataGet as ParamsType;
      const formParamData: ParamsType = {} as ParamsType;
      formParamData.taskId = responseData.taskId;
      formParamData.description = responseData.description;
      formParamData.name = responseData.name;
      formParamData.creationDate = responseData.creationDate;
      formParamData.completionDate = responseData.completionDate;
      formParamData.completed = responseData.completed;
      formParamData.isRequired = responseData.isRequired;
      formParamData.categoryId = responseData.categoryId;
      updateParams(formParamData);

      setUrlComplte((prevValue) => {
        if (responseData.completed) {
          return prevValue + "&isCompleted=false";
        } else {
          return prevValue + "&isCompleted=true";
        }
      });
    }
  }, [dataGet]);

  return (
    <div className="w-full flex items-start justify-start">
      <ParamsContext.Provider value={{ params, setParams: updateParams }}>
        {loadingGet ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <FormTask
            userId={userId}
            flagPage={flagPage}
            onSubmitHandler={onSubmitHandler}
            onCompleteHandler={onCompleteHandler}
          />
        )}
      </ParamsContext.Provider>
    </div>
  );
};

export default Task;
