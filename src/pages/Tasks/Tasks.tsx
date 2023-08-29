import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import {
  Button,
  InputCheckBox,
  UserProfileInfo,
  Modal,
  Loader,
} from "../../components";
import { GridToolbarFilterButton } from "@mui/x-data-grid";
import { RowsTaskExample } from "../../resources/data/TaskData";
import { Comment, HireDetails, TApiResponse, User } from "../../types/types";
import { useEffect, useState } from "react";
import ReviewItem from "../../components/Inputs/ReviewItem/ReviewItem/ReviewItem";
import { useFetch } from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import {
  PATH_EDIT_TASK_PAGE,
  PATH_VIEW_TASK_PAGE,
} from "../../resources/data/RootPath";
import { getRandomNumber } from "../../utils/utils";

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
  // const url = "http://localhost:4000/tasks";
  const url = "https://onportal.azurewebsites.net/api/v1/task/user?user=3";
  const {
    data: dataCategory,
    fetchData: fetchDataCategory,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useFetch(url, "GET");

  const {
    data: dataTasks,
    fetchData: fetchDataTasks,
    isLoading: isLoadingTasks,
    error: errorTasks,
  } = useFetch(url, "GET");

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
    if (dataTasks !== null) {
      /* 
          Al parecer tendre que formatear esta informacion
          antes de mostarla en el grid
        */
      const formatData: TApiResponse[] = dataTasks as TApiResponse[];
      setRowData(formatData);
    }
  }, [dataTasks]);

  useEffect(() => {
    const getTaskResponse = async () => {
      try {
        await fetchDataTasks();
      } catch (error) {
        console.error(
          "🚀 ~ file: Tasks.tsx:73 ~ getTaskResponse ~ error:",
          error
        );
        setRowData([]); // set a empty array for RowData
      }
    };
    getTaskResponse();
  }, []);

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

  /**
   * Function to return a array of row elements
   * with the correct format for the DataGrid
   * @returns
   */
  const handlerRowTask = () => {
    const rowTasks: any = [];

    rowData.forEach((rowHandlerElement) => {
      console.log(
        "🚀 ~ file: Tasks.tsx:190 ~ rowData.forEach ~ rowHandlerElement:",
        rowHandlerElement
      );
      const taskElementFormated = {
        id: getRandomNumber(),
        idTask: rowHandlerElement.id,
        name: rowHandlerElement.name,
        description: rowHandlerElement.description,
        categori: rowHandlerElement.categori,
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
      field: "name",
      headerName: "Name",
      width: 250,
      groupable: false,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
      groupable: true,
      headerAlign: "left",
      align: "left",
    },
    {
      field: "required",
      headerName: "required",
      width: 90,
      groupable: true,
      headerAlign: "left",
      align: "center",
      renderCell: (params) => {
        console.log(
          "🚀 ~ file: Tasks.tsx:193 ~ Tasks ~ params.required:",
          params
        );
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
      width: 90,
      groupable: true,
      headerAlign: "left",
      align: "center",
      renderCell: (params) => {
        console.log(
          "🚀 ~ file: Tasks.tsx:213 ~ Tasks ~ params.completed:",
          params
        );
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
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "completionDate",
      headerName: "Completion Date",
      type: "date",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        console.log(
          "🚀 ~ file: Tasks.tsx:213 ~ Tasks ~ params.completed:",
          params
        );
        const dateValue = params.value;
        if (dateValue === null)
          return (
            <div className="flex w-2/4 py-1 items-center justify-center">
              {dateValue === null ? <h1>NOT FILL</h1> : <h1>{dateValue}</h1>}
            </div>
          );
      },
    },
    {
      field: "categori",
      headerName: "Category",
      type: "string",
      width: 150,
      headerAlign: "center",
      align: "center",
      // renderCell: async (params) => {
      //   console.log(
      //     "🚀 ~ file: Tasks.tsx:213 ~ Tasks ~ params.completed:",
      //     params
      //   );
      //   const categoryValue = params.value;
      //   await fetchDataCategory();

      //   return (
      //     <div className="flex w-2/4 py-1 items-center justify-center">
      //       {categoryValue}
      //     </div>
      //   );
      // },
    },

    {
      field: "comments",
      headerName: "Comments",

      width: 70,
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
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const id = params.row?.id;
        return (
          <div className="flex flex-row w-full py-1 items-center justify-center">
            <Button
              icon={<i className="bi bi-eye"></i>}
              customClass="bg-green-400 py-1 px-1.5 ml-1"
              onClickHandler={() => handlerRedirectViewTask(id)}
            />
            <Button
              icon={<i className="bi bi-pencil-square"></i>}
              customClass="bg-red-400 py-1 px-1.5 ml-1"
              onClickHandler={() => handlerRedirectEditTask(id)}
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
