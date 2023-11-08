/* eslint-disable react-hooks/exhaustive-deps */
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Button,
  InputCheckBox,
  UserProfileInfo,
  Modal,
  Loader,
} from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { Categories, Comment, HireDetails, User } from "../../types/types";
import { useEffect, useState } from "react";
import ReviewItem from "../../components/Inputs/ReviewItem/ReviewItem/ReviewItem";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import {
  PATH_COMPLETE_TASK_PAGE,
  PATH_EDIT_TASK_PAGE,
  PATH_VIEW_TASK_PAGE,
} from "../../resources/data/RootPath";
import { getRandomNumber } from "../../utils/utils";
import { URL_GET_CATEGORY } from "../../resources/data/APIPath";

const commentsListExample: Comment[] = [
  {
    name: "Carlos Lopez",
    body: "Please fill your participation in the form for Great Place To Work",
    id: 2,
    reviewedDate: new Date(2023, 12, 11),
  },
  {
    name: "Diego Campanero",
    body: "Sure I finish the form, sorry for the time",
    id: 8,
    reviewedDate: new Date(2023, 20, 12),
  },
];
const imageExample =
  "https://1fid.com/wp-content/uploads/2022/06/Twitter-profile-picture-4-1024x1024.jpg";

const Tasks = () => {
  const navigate = useNavigate();
  const userID = 3; // Falta definir como se obtendra este ID
  const url = `https://onportal.azurewebsites.net/api/v1/task/user?user=${userID}`;

  const {
    data: dataTasks,
    fetchData: fetchDataTasks,
    isLoading: isLoadingTasks,
    // error: errorTasks,
  } = useFetch(url, "GET");

  const {
    data: dataCategories,
    fetchData: fetchDataCategories,
    // isLoading: isLoadingCategories,
    // error: errorCategories,
  } = useFetch(URL_GET_CATEGORY, "GET");

  const userInfo: User = {
    userId: 4,
    firstName: "Diego Alejandro",
    lastName: "Campanero Negrete",
    roleId: 4,
    email: "dcampanero@apexsystems.com",
    userName: "dcampanero",
  };

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
    try {
      fetchDataCategories();
    } catch (error) {
      console.error("🚀  FetchCategories => error:", error);
    }
    getTaskResponse();
  }, []);

  const [flagDataLoad, setflagDataLoad] = useState(true);

  useEffect(() => {
    if (dataTasks !== null && flagDataLoad) {
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
  }, [dataTasks, flagDataLoad, rowData]);

  const hireDetailsUsers: HireDetails = {
    id: 23,
    hireDate: new Date(2020, 10, 10),
    position: "Middle Consultant",
    userId: "dcampanero",
    managerId: "123",
    ambassadorId: "213",
  };

  const [openModal, setopenModal] = useState(false);

  const handleCloseModal = () => {
    setopenModal(false);
  };

  const handleOpenModal = () => {
    setopenModal(true);
  };

  const handlerRedirectViewTask = (idTask: number) => {
    navigate(PATH_VIEW_TASK_PAGE.replace("taskId", idTask.toString()));
  };

  const handlerRedirectEditTask = (idTask: number) => {
    navigate(PATH_EDIT_TASK_PAGE.replace("taskId", idTask.toString()));
  };

  const handlerRedirectCompleteTask = (idTask: number) => {
    navigate(PATH_COMPLETE_TASK_PAGE.replace("taskId", idTask.toString()));
  };

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

  const COLUMNS: GridColDef[] = [
    {
      field: "taskId",
      headerName: "ID",
      width: 50,
      groupable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 240,
      groupable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      width: 290,
      groupable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "required",
      headerName: "required",
      width: 80,
      groupable: true,
      headerAlign: "left",
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
      field: "completed",
      headerName: "Completed",
      width: 80,
      groupable: true,
      headerAlign: "left",
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
      field: "creationDate",
      headerName: "Creation Date",
      type: "date",
      width: 120,
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
      width: 140,
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
      field: "categoryDescription",
      headerName: "Category",
      type: "string",
      width: 225,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const categoryValue = params.value;
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            {categoryValue}
          </div>
        );
      },
    },

    {
      field: "comments",
      headerName: "Comments",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            <Button
              icon={<i className="bi bi-chat-left-text"></i>}
              customClass="bg-yellow-400 py-1 px-3"
              onClickHandler={handleOpenModal}
            />
          </div>
        );
      },
    },
    {
      field: "view",
      headerName: "View",

      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.taskId;
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            <Button
              icon={<i className="bi bi-eye"></i>}
              customClass="bg-green-400 py-1 px-1.5 ml-1"
              title="View"
              onClickHandler={() => handlerRedirectViewTask(id)}
            />
          </div>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",

      width: 60,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.taskId;
        return (
          <div className="flex w-2/4 py-1 items-center justify-center">
            <Button
              icon={<i className="bi bi-pencil-square"></i>}
              customClass="bg-blue-400 py-1 px-1.5 ml-1"
              onClickHandler={() => handlerRedirectEditTask(id)}
              title="Edit"
            />
          </div>
        );
      },
    },
    {
      field: "complete",
      headerName: "Complete",
      width: 90,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.taskId;
        const isCompleted = params.row?.completed;
        const colorButton = isCompleted ? "bg-red-400" : "bg-green-400";
        return (
          <div className="flex flex-row w-full py-1 items-center justify-center">
            <Button
              icon={
                <i
                  className={`bi ${
                    isCompleted ? "bi-x-octagon" : "bi-check-all"
                  }`}
                ></i>
              }
              customClass={`${colorButton} py-1 px-1.5 ml-1`}
              onClickHandler={() => handlerRedirectCompleteTask(id)}
              title={isCompleted ? `Completed` : `Ready to complete`}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start my-5 h-full w-full">
      <div className="w-full flex items-center justify-center">
        <UserProfileInfo
          userInfo={userInfo}
          hireDetailsUsers={hireDetailsUsers}
          img={imageExample}
        />
      </div>

      <div className=" h-3/4 my-5 w-full">
        <>
          {isLoadingTasks ? (
            <>
              <Loader />
            </>
          ) : (
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
          )}
        </>
        {/* )} */}
      </div>
      <Modal handleCloseModal={handleCloseModal} openModal={openModal}>
        <div>
          {commentsListExample.map((itemComment) => (
            <ReviewItem disableButtons={true} item={itemComment} />
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default Tasks;
