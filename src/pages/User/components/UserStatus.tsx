import { useEffect, useState } from "react";
import {
  BAD_ANSWER_TASK,
  GOOD_ANSWER_TASK,
  REGULAR_ANSWER_TASK,
} from "../../../resources/data/TaskData";

interface UserStatusProps {
  total: number;
  completed: number;
}

const UserStatus = ({ total, completed }: UserStatusProps) => {
  const [userInfoMessage, setUserInfoMessage] = useState("");
  const [classElementColor, setClassElementColor] = useState("");
  const currentStatus = "Available";
  const lastUpdate = new Date();

  useEffect(() => {
    // if (total && completed) {
    switch (true) {
      case completed < total / 2:
        setClassElementColor(` bg-red-600`);
        setUserInfoMessage(BAD_ANSWER_TASK);
        break;
      case completed < total / 1.5:
        setClassElementColor(` bg-yellow-600`);
        setUserInfoMessage(REGULAR_ANSWER_TASK);
        break;
      case completed < total:
        setClassElementColor(` bg-lime-400`);
        setUserInfoMessage(GOOD_ANSWER_TASK);
        break;
      default:
        setClassElementColor(` bg-black`);
    }
    // }
  }, [total, completed]);

  return (
    <div className="flex h-60 w-[1070px] flex-row bg-white border rounded-t-lg border-zinc-300">
      <div
        className={`flex items-center justify-center w-1/4 ${classElementColor}`}
      >
        <h1 className="text-5xl text-white">{`${completed}/${total}`}</h1>
      </div>
      <div className="w-3/4 flex flex-col items-start justify-center mx-5">
        <h1 className="text-2xl my-2">Your Current Status - {currentStatus}</h1>
        <p className="my-2 text-justify">{userInfoMessage}</p>
        <h5 className="text-sm text-gray-400 my-2">
          Last Update {lastUpdate.getTimezoneOffset()}
        </h5>
      </div>
    </div>
  );
};

export default UserStatus;
