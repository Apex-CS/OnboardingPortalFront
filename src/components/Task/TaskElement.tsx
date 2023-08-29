import { TaskElementProps } from "../../types/types";



const TaskElement = ({item}: TaskElementProps) => {
    const tempClass = `text-md flex w-1/5 items-center justify-center text-zinc-200 mx-2 rounded-xl px-2 py-1`;
    const limit = item.limit;
    let classElement: string ;
    switch (true) {
        case (item.counter < (limit / 2)):
            classElement = tempClass + ` bg-red-600`;
            break;
        case (item.counter < (limit / 1.5)):
            classElement = tempClass + ` bg-yellow-600`;
            break;
        case (item.counter < (limit)):
            classElement = tempClass + ` bg-green-600`;
            break;
        default:
            classElement = tempClass;
    }

    return (
        <li className="h-16 flex flex-row items-center justify-between">
            <h1>{item.title}</h1>
                <h3 className={classElement}>{item.counter} / {limit}</h3>
        </li>
    );
}

export default TaskElement;