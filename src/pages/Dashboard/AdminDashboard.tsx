import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { LabelTitle, Search } from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";

const AdminDashboard = () => {
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
  ];

  return (
    <div className="flex flex-col items-center justify-start my-5 h-full w-full">
      <div className="w-full flex justify-start items-start">
        <LabelTitle
          textSize="text-3xl"
          customClass="text-blue-400"
          title="Admin Dashboard"
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

export default AdminDashboard;
