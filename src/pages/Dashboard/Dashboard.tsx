import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { Button, InputCheckBox, Search } from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { getRandomDate, getRandomNumber } from "../../utils/utils";
import { Link } from "react-router-dom";
import { PATH_EDIT_TASK_PAGE } from "../../resources/data/RootPath";
interface TaskElementLocalProps {
  item: {
    title: string;
    url: string;
    counter: number;
    limit: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TaskElementLocal = ({ item }: TaskElementLocalProps) => {
  const tempClass = `text-md flex w-full items-center justify-center text-zinc-200 mx-2 rounded-xl px-2 py-1`;
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
    <li className="h-16 flex flex-row items-center justify-between">
      <h1>{item.title}</h1>
      <h3 className={classElement}>
        {item.counter} / {limit}
      </h3>
    </li>
  );
};

const Dashboard = () => {
  const MAX_NUMBER_ID_TASK = 99999;
  const MAX_NUMBER_ID_USER = 99999;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handlerTaskValue = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    const item = {
      title: params.row.name,
      url: params.row.tasks.url,
      counter: params.row.tasks.counter,
      limit: params.row.tasks.limit,
    };
    return item;
  };

  const rows: GridRowsProp = [
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
    {
      id: getRandomNumber(MAX_NUMBER_ID_TASK),
      name: "",
      description: "",
      categori: "",
      creationDate: getRandomDate(),
      completionDate: getRandomDate(),
      completed: true,
      required: true,
      userId: getRandomNumber(MAX_NUMBER_ID_USER),
    },
  ];

  const COLUMNS: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Task Name",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "description",
      headerName: "Description",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categori",
      headerName: "Categori",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "completionDate",
      headerName: "Completion Date",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "completed",
      headerName: "Completed",
      width: 85,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            <InputCheckBox
              label=""
              handlerInputCheck={() => null}
              value={params.value}
              disabled={true}
            />
          </div>
        );
      },
    },
    {
      field: "required",
      headerName: "Required",
      width: 85,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            <InputCheckBox
              label=""
              handlerInputCheck={() => null}
              value={params.value}
              disabled={true}
            />
          </div>
        );
      },
    },
    {
      field: "",
      headerName: "",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.id;
        const url = PATH_EDIT_TASK_PAGE.replace("taskId", id);
        return (
          <div className="flex items-center justify-center">
            <Link to={`${url}`}>
              <Button
                icon={<i className="bi bi-send-dash"></i>}
                customClass="px-3 bg-blue-400 "
              />
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start my-5 h-full w-full">
      <div className="w-11/12 flex items-center justify-end">
        <Search
          className="flex flex-row w-2/6"
          label="Search user"
          placeHolder="Search user..."
        />
      </div>
      <div className=" h-3/4 my-5 w-11/12">
        <DataGrid
          slots={{
            toolbar: GridToolbarFilterButton,
          }}
          rows={rows}
          columns={COLUMNS}
        />
      </div>
    </div>
  );
};

export default Dashboard;
