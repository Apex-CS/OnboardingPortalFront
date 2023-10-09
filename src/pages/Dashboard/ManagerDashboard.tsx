import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, LabelTitle, Search } from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { PATH_CREATE_TASK_PAGE } from "../../resources/data/RootPath";

interface ManagerDashboardProps {}

// eslint-disable-next-line no-empty-pattern
const ManagerDashboard = ({}: ManagerDashboardProps) => {
  const rows: GridRowsProp = [
    {
      id: 1,
      name: "Diego",
      practice: "Frontend",
      position: "Consultant",
      tasks: {
        title: "string",
        url: "string",
        counter: 2,
        limit: 10,
      },
    },
    {
      id: 2,
      name: "Oscar",
      practice: "Backend",
      position: "Sr",
      tasks: {
        title: "string",
        url: "string",
        counter: 8,
        limit: 10,
      },
    },
    {
      id: 3,
      name: "Angel",
      practice: "Backend",
      position: "TL",
      tasks: {
        title: "string",
        url: "string",
        counter: 5,
        limit: 10,
      },
    },
  ];

  const COLUMNS: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "lastname",
      headerName: "Last Name",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "practice",
      headerName: "Practice",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "position",
      headerName: "Position",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "info",
      headerName: "Info",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.id;
        return (
          <div className="flex items-center justify-center">
            <Link to={`/user/view/:${id}`}>
              <Button
                icon={<i className="bi bi-send-dash"></i>}
                customClass="px-3 bg-blue-400 "
              />
            </Link>
          </div>
        );
      },
    },
    {
      field: "task",
      headerName: "Create Task",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.id;
        return (
          <div className="flex items-center justify-center">
            <Link to={PATH_CREATE_TASK_PAGE}>
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
      <div className="w-full flex justify-start items-start">
        <LabelTitle
          textSize="text-3xl"
          customClass="text-blue-400"
          title="Manager Dashboard"
        />
      </div>

      <div className="w-11/12 flex items-center justify-end">
        <Search
          className="flex flex-row w-2/6"
          label="Search user"
          placeHolder="Search user..."
        />
      </div>
      <div className=" h-4/4 my-5 w-11/12">
        <DataGrid
          slots={{
            toolbar: GridToolbarFilterButton,
          }}
          rows={rows}
          columns={COLUMNS}
        />
      </div>
      <div className=" h-3/4 my-5 w-11/12"></div>
    </div>
  );
};

export default ManagerDashboard;
