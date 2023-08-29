import { HireDetails, User } from "../../types/types";
import LabelSubtitle from "../Labels/LabelSubTitle";

interface UserProfileInfoProps {
  userInfo: User;
  hireDetailsUsers: HireDetails;
  img: string;
}

const UserProfileInfo = ({
  userInfo,
  hireDetailsUsers,
  img,
}: UserProfileInfoProps) => {
  return (
    <div className="w-2/4 bg-gray-100 border border-gray-200 rounded-lg shadow">
      <div className="flex w-full justify-end px-4 pt-4"></div>
      <div className="flex w-full flex-row justify-between items-center pb-10 px-4 pt-4">
        <div className="flex flex-col items-center justify-center ">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            alt="profile"
            src={img}
          />
          <LabelSubtitle
            textSize="text-lg"
            subtitle={`${userInfo.firstName} ${userInfo.lastName}`}
          />
          <span className="text-sm py-2 text-gray-500 dark:text-gray-400">
            ID#{userInfo.userId} - {userInfo.userName} -
            {hireDetailsUsers.position}
          </span>
        </div>

        <ul className="space-y-4 w-60 text-gray-500 dark:text-gray-400">
          <li className="flex space-x-2">
            <span className="leading-tight">
              <b>Hire Date:</b> {hireDetailsUsers.hireDate.toLocaleDateString()}
            </span>
          </li>
          <li className="flex space-x-2">
            <span className="leading-tight">
              <b>Rol:</b> {userInfo.roleId}
            </span>
          </li>
          <li className="flex space-x-2">
            <span className="leading-tight">
              <b>Supervisor:</b> {hireDetailsUsers.managerId}
            </span>
          </li>
          <li className="flex space-x-2">
            <span className="leading-tight">
              <b>Amabassador:</b> {hireDetailsUsers.ambassadorId}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfileInfo;
