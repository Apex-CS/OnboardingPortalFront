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
  const URL_API_TASK = `https://onboardingportal-production.up.railway.app/api/v1/task`;

  const url = window.location.href;
  const [params, setParams] = useState<ParamsType>({} as ParamsType);
  const urlAPIGet = taskId
    ? `${URL_API_TASK}/{id}?id=${taskId.substring(1, taskId.length)}`
    : "";
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
      const paramsElement = await getTaskData(taskId);
      updateParams(paramsElement);
    }
  };

  const onSubmitHandler = async (params: ParamsType) => {
    if (taskId) {
      // Edit a existing Task
      await fetchDataPut(params);
    } else {
      // Create a new Task
      await fetchDataPost(params);
    }
  };

  useEffect(() => {
    if (url.includes("/edit")) {
      setFlagPage("edit");
    } else if (url.includes("/view")) {
      setFlagPage("view");
    }
    validateIDParam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Execute just in the first render

  return (
    <div className="w-full flex items-start justify-start">
      <ParamsContext.Provider value={{ params, setParams: updateParams }}>
        {loadingGet ? (
          <div className="w-screen h-screen flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <FormTask flagPage={flagPage} onSubmitHandler={onSubmitHandler} />
        )}
      </ParamsContext.Provider>
    </div>
  );
};

export default Task;
