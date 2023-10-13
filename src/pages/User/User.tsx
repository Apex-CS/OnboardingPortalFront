import { listDataElement } from "../../types/types";
import { TaskList, UsefullLinks, UserStatus } from "./components";
import ListTask from "./components/ListTask";
import { getRandomNumber } from "../../utils/utils";
import { useEffect, useState } from "react";
import { Loader } from "../../components";
import { useNotification } from "../../hooks/useNotification";
import { useParams } from "react-router-dom";

const Home = () => {
  let { userId } = useParams();
  const [flagView, setFlagView] = useState(false);
  useEffect(() => {
    if (userId) {
      setFlagView(true);
    }
  }, [userId]);

  const personalTaskDataTemp: listDataElement[] = [
    {
      titleTask: "Contact Supervisor",
      status: false,
      description: "Discus with your supervisor",
    },
    {
      titleTask: "Provide Signed Document",
      status: false,
      description: "Print and sign your document",
    },
    {
      titleTask: "Upload Offer Signed",
      status: false,
      description: "Upload offer letter",
    },
  ];

  const AdministrativeTaskDataTemp: listDataElement[] = [
    {
      titleTask: "Contact Supervisor",
      status: false,
      description: "Discus with your supervisor",
    },
    {
      titleTask: "Provide Signed Document",
      status: false,
      description: "Print and sign your document",
    },
    {
      titleTask: "Upload Offer Signed",
      status: false,
      description: "Upload offer letter",
    },
  ];

  const { displayNotification } = useNotification();
  useEffect(() => {
    displayNotification({
      message: "This notification displays when the app first renders!",
    });
  }, [displayNotification]);

  const [personalTaskData, setPersonalTaskData] = useState<listDataElement[]>(
    []
  );
  const [administrativeTaskData, setAdministrativeTaskData] = useState<
    listDataElement[]
  >([]);

  useEffect(() => {
    const getPersonalTaskData = () => {
      return personalTaskDataTemp;
    };

    const getAdministrativeTaskData = () => {
      return AdministrativeTaskDataTemp;
    };

    setTimeout(() => {
      setPersonalTaskData(getPersonalTaskData());
      setAdministrativeTaskData(getAdministrativeTaskData());
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col h-full mx-auto mt-4 mb-4">
      <div className="w-full flex flex-row justify-between items-center ">
        <div className="w-3/4">
          <UserStatus />
        </div>
        <div className="w-1/4 pl-4">
          <TaskList />
        </div>
      </div>
      <div className="w-full flex flex-row justify-between mt-5 items-start">
        <div className="w-3/4">
          <>
            {personalTaskData.length > 0 ? (
              <ListTask
                disabled={flagView}
                listData={personalTaskData}
                setListData={setPersonalTaskData}
                title="Personal Task"
                key={getRandomNumber(1000000)}
              />
            ) : (
              <Loader />
            )}
          </>
          <>
            {personalTaskData.length > 0 ? (
              <ListTask
                disabled={flagView}
                listData={administrativeTaskData}
                setListData={setAdministrativeTaskData}
                title="Administrative Task"
                key={getRandomNumber(1000000)}
              />
            ) : (
              <Loader />
            )}
          </>
        </div>
        <div className="w-1/4 pl-4">
          <UsefullLinks />
        </div>
      </div>
    </div>
  );
};

export default Home;
