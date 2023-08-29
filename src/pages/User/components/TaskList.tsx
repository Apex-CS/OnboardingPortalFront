import { TaskElementProps, TaskListElementProps } from "../../../types/types";
import { getRandomNumber } from "../../../utils/utils";

const TaskList = () => {
  const TaskElement = ({ item }: TaskElementProps) => {
    const tempClass = `text-md flex w-1/5 items-center justify-center text-zinc-200 mx-2 rounded-xl px-2 py-1`;
    const limit = item.limit;
    let classElement: string;
    switch (true) {
      case item.counter < limit / 2:
        classElement = tempClass + ` bg-red-600`;
        break;
      case item.counter < limit / 1.5:
        classElement = tempClass + ` bg-yellow-600`;
        break;
      case item.counter < limit:
        classElement = tempClass + ` bg-green-600`;
        break;
      default:
        classElement = tempClass;
    }

    return (
      <li
        key={getRandomNumber()}
        className="h-16 flex flex-row items-center justify-between"
      >
        <h1>{item.title}</h1>
        <h3 className={classElement}>
          {item.counter} / {limit}
        </h3>
      </li>
    );
  };

  const listData: TaskListElementProps[] = [
    {
      title: "Administrative Task",
      counter: 2,
      limit: 6,
    },
    {
      title: "Personal Training",
      counter: 7,
      limit: 10,
    },
    {
      title: "Trainig Task",
      counter: 5,
      limit: 8,
    },
  ];
  return (
    <div className="flex h-auto flex-col m-2 border rounded-t-lg border-zinc-300">
      <ul className="mx-1 bg-white rounded-t-lg divide-y divide-zinc-200 px-2">
        {listData.map((item) => (
          <TaskElement item={item} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
