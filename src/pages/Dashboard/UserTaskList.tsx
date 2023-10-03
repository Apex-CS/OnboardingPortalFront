import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, InputCheckBox } from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { getRandomNumber } from "../../utils/utils";
import { Link } from "react-router-dom";
import { PATH_EDIT_TASK_PAGE } from "../../resources/data/RootPath";
import { useFetch } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { URL_GET_CATEGORY } from "../../resources/data/APIPath";
import { Categories } from "../../types/types";

const Dashboard = () => {
  const userID = 3; // Falta definir como se obtendra este ID
  const url = `https://onportal.azurewebsites.net/api/v1/task/user?user=${userID}`;

  const {
    data: dataTasks,
    fetchData: fetchDataTasks,
    isLoading: isLoadingTasks,
    error: errorTasks,
  } = useFetch(url, "GET");

  const {
    data: dataCategories,
    fetchData: fetchDataCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useFetch(URL_GET_CATEGORY, "GET");

  const [rowData, setRowData] = useState<any[]>([]);
  useEffect(() => {
    const getTaskResponse = async () => {
      try {
        await fetchDataTasks();
      } catch (error) {
        console.error("🚀 ~ getTaskResponse ~ error:", error);
        setRowData([]); // set a empty array for RowData
      }
    };

    const getCategorys = async () => {
      try {
        await fetchDataCategories();
      } catch (error) {
        console.error("🚀  FetchCategories => error:", error);
      }
    };
    getTaskResponse();
    getCategorys();
  }, []);

  const [flagDataLoad, setflagDataLoad] = useState(true);

  useEffect(() => {
    if (dataTasks !== null && flagDataLoad && !isLoadingCategories) {
      const formatData: any[] = dataTasks as any[];
      const dataCategoriesList = dataCategories as Categories[];
      formatData.forEach(async (rowItem) => {
        try {
          const categoryID = rowItem.categoryId;
          dataCategoriesList.forEach((item) => {
            if (item.id === categoryID) {
              rowItem.categoryDescription = item.description;
              return item;
            }
          });
        } catch (error) {
          console.error(
            "🚀 ~ file: Tasks.tsx:112 ~ formatData.forEach ~ errorResponse:",
            error
          );
        }
      });
      setRowData(formatData);
      setflagDataLoad(false);
    }
  }, [dataCategories, dataTasks, flagDataLoad, isLoadingCategories, rowData]);

  /**
   * Function to return a array of row elements
   * with the correct format for the DataGrid
   * @returns
   */
  const handlerRowTask = () => {
    const rowTasks: any = [];

    rowData.forEach((rowHandlerElement) => {
      const taskElementFormated = {
        id: getRandomNumber(),
        taskId: rowHandlerElement.taskId,
        name: rowHandlerElement.name,
        description: rowHandlerElement.description,
        categoryDescription: rowHandlerElement.categoryDescription,
        creationDate: new Date(rowHandlerElement.creationDate),
        completionDate: rowHandlerElement.completionDate,
        completed: rowHandlerElement.completed,
        required: rowHandlerElement.isRequired,
      };
      rowTasks.push(taskElementFormated);
    });
    const returnArray: GridRowsProp = rowTasks;
    return returnArray;
  };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handlerTaskValue = (
  //   params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  // ) => {
  //   const item = {
  //     title: params.row.name,
  //     url: params.row.tasks.url,
  //     counter: params.row.tasks.counter,
  //     limit: params.row.tasks.limit,
  //   };
  //   return item;
  // };

  const COLUMNS: GridColDef[] = [
    {
      field: "taskId",
      headerName: "Task ID",
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
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      width: 200,
      groupable: true,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "categoryDescription",
      headerName: "Category",
      width: 250,
      groupable: true,
      headerAlign: "center",
      align: "left",
    },
    {
      field: "creationDate",
      headerName: "Creation Date",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        const dateValue =
          value !== null ? new Date(value).toLocaleDateString("en-ca") : null;
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            {<h1>{dateValue}</h1>}
          </div>
        );
      },
    },
    {
      field: "completionDate",
      headerName: "Completion Date",
      width: 150,
      groupable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const value = params.value;
        const dateValue =
          value !== null ? new Date(value).toLocaleDateString("en-ca") : null;
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            {dateValue === null ? <h1>NOT FILL</h1> : <h1>{dateValue}</h1>}
          </div>
        );
      },
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
      width: 50,
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
      {/* <div className="w-11/12 flex items-center justify-end">
        <Search
          className="flex flex-row w-2/6"
          label="Search user"
          placeHolder="Search user..."
        />
      </div> */}
      <div className=" h-4/4 my-5 w-11/12">
        <DataGrid
          slots={{
            toolbar: GridToolbarFilterButton,
          }}
          rows={handlerRowTask()}
          columns={COLUMNS}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
