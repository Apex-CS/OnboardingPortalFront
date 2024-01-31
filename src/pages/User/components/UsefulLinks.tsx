import { IC_POINTS_PAGE } from "../../../resources/data/Paths";
import { getRandomNumber } from "../../../utils/utils";

interface UsefulLinksItemProps {
  title: string;
  url: string;
}

const UsefulLinks = () => {
  const linksData: UsefulLinksItemProps[] = [
    {
      title: "Request vacations",
      url: "/",
    },
    {
      title: "Request day off",
      url: "/",
    },
    {
      title: "Update your resume",
      url: "/",
    },
    {
      title: "Capture IC points",
      url: IC_POINTS_PAGE,
    },
    {
      title: "Send a message to your supervisor",
      url: "/",
    },
  ];

  return (
    <div className="flex flex-col border rounded-t-lg border-zinc-300">
      <div className="flex items-center justify-around rounded-t-lg bg-sky-500">
        <h1 className="text-3xl py-1 text-white">Useful Links</h1>
      </div>
      <div>
        <ul className="mx-1 bg-white rounded-t-lg divide-y divide-zinc-200">
          {linksData.map((item) => (
            <li
              key={getRandomNumber()}
              className="h-16 flex flex-col items-start justify-center"
            >
              <a href={item.url} rel="noreferrer" target="_blank">
                <h1 className="text-lg text-zinc-600 mx-2">{item.title}</h1>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UsefulLinks;
