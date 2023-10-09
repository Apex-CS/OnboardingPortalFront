import { useEffect, useState } from "react";
import FormTask from "./components/Form";
import { useParams } from "react-router-dom";
import { ParamsContext, ParamsType } from "./context/FormContext";
import { FormTaskEditExampleData } from "../../resources/data/TaskData";
import { useFetch } from "../../hooks/useFetch";
import { Loader } from "../../components";

const Task = () => {
  let { taskId } = useParams();
  const [flagPage, setFlagPage] = useState("");
  const URL_API_TASK = `https://onportal.azurewebsites.net/api/v1/task`;
  const URL_API_COMPLETE_TASK = taskId
    ? `https://onportal.azurewebsites.net/api/v1/task/completed?taskId=${taskId.substring(
        1,
        taskId.length
      )}&isCompleted=true`
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
      : new Date();

    const paramsData = {
      taskId: params.taskId,
      name: params.name,
      description: params.description,
      isRequired: params.isRequired,
      completed: params.completed,
      creationDate: "2023-08-30T18:01:23.099Z",
      completionDate: completedDate,
      comments: "example of comments",
      categoryId: params.categoryId,
      userId: 3,
    };

    try {
      await fetchDataPut(paramsData);
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitEditHandler ~ error:",
        error
      );
    }
  };

  const onCompleteTaskHandler = async (paramsValue: ParamsType) => {
    const completedDate = params.completionDate
      ? new Date(params.completionDate).toISOString()
      : new Date();

    const paramsData = {
      taskId: params.taskId,
      name: params.name,
      description: params.description,
      isRequired: params.isRequired,
      completed: params.completed,
      creationDate: "2023-08-30T18:01:23.099Z",
      completionDate: completedDate,
      comments: "example of comments",
      categoryId: params.categoryId,
      userId: 3,
    };

    try {
      setUrlComplte((prevValue) => {
        const newURL = prevValue.replace("$isCompleted", "true");
        console.log(
          "🚀 ~ file: Task.tsx:152 ~ onSubmitCreateHandler ~ newURL:",
          newURL
        );
        return newURL;
      });
      await fetchDataCompleteTask(paramsData);
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitEditHandler ~ error:",
        error
      );
    }
  };

  const onSubmitCreateHandler = async (paramsValue: ParamsType) => {
    console.log(
      "🚀 ~ file: Task.tsx:89 ~ onSubmitCreateHandler ~ paramsValue:",
      paramsValue
    );
    const completedDate = new Date(params.completionDate).toISOString();
    const paramsData = {
      taskId: 232,
      name: "string",
      description: "string",
      isRequired: true,
      completed: true,
      creationDate: "2023-10-03T19:31:29.373Z",
      completionDate: "2023-10-03T19:31:29.373Z",
      comments: "string",
      categoryId: 2,
      userId: 3,
    };
    console.log(
      "🚀 ~ file: Task.tsx:100 ~ onSubmitCreateHandler ~ paramsData:",
      paramsData
    );
    setUrlComplte((prevValue) => {
      const newURL = prevValue.replace("$isCompleted", "true");
      console.log(
        "🚀 ~ file: Task.tsx:152 ~ onSubmitCreateHandler ~ newURL:",
        newURL
      );
      return newURL;
    });
    try {
      await fetchDataPost(paramsData);
    } catch (error) {
      console.error(
        "🚀 ~ file: Task.tsx:106 ~ onSubmitCreateHandler ~ error:",
        error
      );
    }
  };

  // const onSubmitHandler = async (params: ParamsType) => {
  const onSubmitHandler = async () => {
    console.log("🚀 ~ file: Task.tsx:118 ~ onSubmitHandler ~ taskId:", taskId);
    if (taskId) {
      // Edit a existing Task
      await onSubmitEditHandler(params);
    } else {
      console.log("🚀 ~ file: Task.tsx:123 ~ onSubmitHandler ~ entro aqui:");
      // Create a new Task
      await onSubmitCreateHandler(params);
    }
  };

  const onCompleteHandler = async () => {
    console.log("🚀 ~ file: Task.tsx:118 ~ onSubmitHandler ~ taskId:", taskId);
    // Edit a existing Task
    setUrlComplte((prevValue) => {
      const newURL = prevValue.replace("$isCompleted", "true");
      console.log(
        "🚀 ~ file: Task.tsx:152 ~ onSubmitCreateHandler ~ newURL:",
        newURL
      );
      return newURL;
    });
    await onCompleteTaskHandler(params);
  };

  useEffect(() => {
    console.log("asdnabsdyavdghasvgd", url);
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
      console.log("🚀 ~ file: Task.tsx:143 ~ useEffect ~ dataGet:", dataGet);
      const responseData = dataGet as ParamsType;
      const formParamData: ParamsType = {} as ParamsType;
      console.log(
        "🚀 ~ file: Task.tsx:145 ~ useEffect ~ formParamData:",
        formParamData
      );
      formParamData.taskId = responseData.taskId;
      formParamData.description = responseData.description;
      formParamData.name = responseData.name;
      formParamData.creationDate = responseData.creationDate;
      formParamData.completionDate = responseData.completionDate;
      formParamData.completed = responseData.completed;
      formParamData.isRequired = responseData.isRequired;
      formParamData.categoryId = responseData.categoryId;
      updateParams(formParamData);
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
