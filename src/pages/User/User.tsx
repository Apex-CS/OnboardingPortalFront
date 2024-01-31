import {
  Categories,
  Task,
  TaskListElementProps,
  listDataElement,
} from "../../types/types";
import { TaskList, UsefulLinks, UserStatus } from "./components";
import ListTask from "./components/ListTask";
import { useEffect, useState } from "react";
import { ErrorMessage, Loader } from "../../components";
import { useParams } from "react-router-dom";
import {
  ENDPOINT_API,
  URL_GET_CATEGORY,
  URL_TASK_COUNT,
} from "../../resources/data/APIPath";
import { fetchDataHook, useFetch } from "../../hooks/useFetch";

export type CategoryArrayList = {
  [key: string]: listDataElement[];
};

export type MyObjectX = {
  [key: string]: listDataElement[];
};

function createObject(keys: string[]): CategoryArrayList {
  const myObject: CategoryArrayList = {};

  keys.forEach((key) => {
    myObject[key] = []; // You can set default values or leave it empty
  });

  return myObject;
}

const Home = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [allTask, setAllTask] = useState<Task[]>([]);
  const [listCategoriesData, setListCategoriesData] =
    useState<CategoryArrayList>({});
  const {
    isLoading: isLoadingTaskUser,
    fetchDataResponse: fetchDataAllTaskResponse,
  } = useFetch(`${ENDPOINT_API}/task/user?user=${3}`, "GET");

  const [totalTask, setTotalTask] = useState(0);
  const [completedTask, setCompletedTask] = useState(0);

  const {
    fetchDataResponse: fetchDataCategoriesResponse,
    error: errorCategories,
  } = useFetch(URL_GET_CATEGORY, "GET");
  const getCategoriesEffect = async () => {
    return fetchDataCategoriesResponse();
  };

  const getAllTaskEffect = async () => {
    const response = await fetchDataAllTaskResponse();
    return response;
  };

  const getTotalTask = async () => {
    try {
      return await fetchDataHook(URL_TASK_COUNT, { method: "GET" });
    } catch (error) {
      console.error("🚀 ~ getTotalTask ~ error:", error);
    }
  };

  useEffect(() => {
    getCategoriesEffect().then((response) => {
      const dataResponse = response.data as Categories[];
      if (dataResponse.length > 0) {
        setCategories(dataResponse);
      }
    });

    getAllTaskEffect().then((response) => {
      if (errorCategories === null) {
        setAllTask(response.data as Task[]);
      }
    });

    getTotalTask().then((response) => {
      const dataTOWork = response as unknown as TaskListElementProps[];

      let total = 0;
      let completed = 0;
      dataTOWork?.forEach((item) => {
        total += item.total;
        completed += item.completed;
      });
      setTotalTask(total);
      setCompletedTask(completed);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (allTask.length > 0 && categories?.length > 0) {
      const categoriesStringArray = categories.map((category) => category.name);
      const object = createObject(categoriesStringArray);
      allTask?.forEach((taskItem) => {
        const newTaskItem: listDataElement = {
          taskID: taskItem.taskId,
          description: taskItem.description,
          status: taskItem.completed,
          titleTask: taskItem.name,
          categoryID: taskItem.categoryId,
        };
        const categoryKey = categories.find(
          (item) => item.id === taskItem.categoryId
        );
        object[categoryKey ? categoryKey.name : ""].push(newTaskItem);
      });
      setListCategoriesData(object);
    }
  }, [allTask, categories]);

  let { userId } = useParams();
  const [flagView, setFlagView] = useState(false);
  useEffect(() => {
    if (userId) {
      setFlagView(true);
    }
  }, [userId]);

  const getCategoryNameById = (idCategory: number) => {
    const response = categories.find(
      (categoryItem) => categoryItem.id === idCategory
    );
    return response?.name ? response?.name : "Not Found Category";
  };

  return (
    <div className="flex flex-col h-full mx-auto mt-4 mb-4">
      <div className="w-full flex flex-row justify-between items-center ">
        {!isLoadingTaskUser ? (
          <UserStatus completed={completedTask} total={totalTask} />
        ) : (
          <Loader />
        )}
        <div className="pl-4">
          <TaskList />
        </div>
      </div>
      <div className="w-full h-full flex flex-row justify-between mt-5 items-start relative">
        <div className="w-[1070px]  scrollable-area ">
          <>
            {errorCategories !== null ? (
              <div className="w-full flex justify-center items-center">
                <ErrorMessage
                  description={errorCategories.message}
                  title={`Categories: ${errorCategories.name}`}
                />
              </div>
            ) : (
              <>
                {listCategoriesData ? (
                  <>
                    {Object.values(listCategoriesData).map((categoryValue) => (
                      <ListTask
                        disabled={flagView}
                        listData={categoryValue}
                        title={getCategoryNameById(
                          categoryValue[0]?.categoryID
                            ? categoryValue[0]?.categoryID
                            : 0
                        )}
                        key={`list-task-category-${categoryValue[0]?.categoryID}`}
                      />
                    ))}
                  </>
                ) : (
                  <Loader />
                )}
              </>
            )}
          </>
        </div>
        <div className="w-1/4 pl-4">
          <UsefulLinks />
        </div>
      </div>
    </div>
  );
};

export default Home;
