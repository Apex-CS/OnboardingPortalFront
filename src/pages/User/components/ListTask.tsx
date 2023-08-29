import { getRandomNumber } from "../../../utils/utils";

type listDataElement = {
  titleTask: string;
  status: boolean;
  description: string;
};

interface ListTaskProps {
  title: string;
  listData: listDataElement[];
  setListData: React.Dispatch<React.SetStateAction<listDataElement[]>>;
  disabled?: boolean;
}

const ListTask = ({
  title,
  listData,
  setListData,
  disabled = false,
}: ListTaskProps) => {
  const handlerInputCheck = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemList: listDataElement
  ) => {
    const newArray = listData.map((item) => {
      if (item.titleTask === itemList.titleTask) {
        item.status = !item.status;
      }
      return item;
    });
    setListData(newArray);
    event.preventDefault();
  };

  return (
    <div className="flex flex-col mx-2 mb-5 border rounded-t-lg border-zinc-300">
      <div className="flex items-center justify-start rounded-t-lg bg-sky-500">
        <h1 className="text-3xl py-1 text-white">{title}</h1>
      </div>
      <ul className="mx-1 bg-white rounded-t-lg divide-y divide-zinc-200">
        {listData.map((itemList, index) => (
          <li
            key={getRandomNumber()}
            className="h-16 flex flex-row items-center justify-stretch"
          >
            <div className="flex w-5/6 flex-col">
              <div className="flex w-5/6 flex-row">
                <h2 className="w-full text-xl text-zinc-900 mx-2">
                  {index}. {itemList.titleTask}
                </h2>
              </div>
              <h5 className="w-full ml-16 text-sm text-zinc-400 mx-2">
                {itemList.description}
              </h5>
            </div>
            <div className="flex w-1/6 items-center">
              <input
                id="link-checkbox"
                type="checkbox"
                disabled={disabled}
                checked={itemList.status}
                value={itemList.status ? 1 : 0}
                onChange={(e) => handlerInputCheck(e, itemList)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {itemList.status ? "Done" : "Pending"}.
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTask;
