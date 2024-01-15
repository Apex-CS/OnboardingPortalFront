import { useEffect, useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { URL_TASK_COUNT } from "../../../resources/data/APIPath";
import { TaskElementProps, TaskListElementProps } from "../../../types/types";
import { getRandomNumber } from "../../../utils/utils";
import { ErrorMessage } from "../../../components";
const TaskElement = ({ item }: TaskElementProps) => {
  const tempClass = `text-md flex w-1/5 items-center justify-center text-zinc-200 mx-2 rounded-xl px-2 py-1`;
  const total = item.total;
  let classElement: string;
  switch (true) {
    case item.completed < total / 2:
      classElement = tempClass + ` bg-red-600`;
      break;
    case item.completed < total / 1.5:
      classElement = tempClass + ` bg-yellow-600`;
      break;
    case item.completed < total:
      classElement = tempClass + ` bg-green-500`;
      break;
    default:
      classElement = tempClass + ` bg-green-700`;
  }

  return (
    <li
      key={getRandomNumber()}
      className="h-16 bg- flex flex-row items-center justify-between"
    >
      <h1>{item.category}</h1>
      <h3 className={classElement}>
        {item.completed} / {total}
      </h3>
    </li>
  );
};
const TaskList = () => {
  const {
    data: dataTaskCount,
    fetchData: fetchDataTaskCount,
    error: errorData,
  } = useFetch(URL_TASK_COUNT, "GET");

  const [listTaskDataCount, setListTaskDataCount] = useState<
    TaskListElementProps[]
  >([]);

  useEffect(() => {
    const getDataTaskCount = async () => {
      const responseTaskCount = await fetchDataTaskCount();
      const taskDataCount: TaskListElementProps[] =
        responseTaskCount as unknown as TaskListElementProps[];
      if (taskDataCount) {
        setListTaskDataCount(taskDataCount);
      }
    };
    getDataTaskCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataTaskCount) {
      setListTaskDataCount(dataTaskCount as unknown as TaskListElementProps[]);
    }
  }, [dataTaskCount]);
  return (
    <div className="flex h-60 w-[340px] items-center justify-center flex-col border rounded-t-lg border-zinc-300">
      {errorData === null ? (
        <ul className="mx-1 bg-white rounded-t-lg divide-y divide-zinc-200 px-2">
          {listTaskDataCount.map((item) => (
            <TaskElement item={item} />
          ))}
        </ul>
      ) : (
        <ErrorMessage
          description={errorData?.message}
          title={errorData?.name}
        />
      )}
    </div>
  );
};

export default TaskList;
