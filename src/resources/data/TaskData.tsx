import { GridRowsProp } from "@mui/x-data-grid";
import { Categories, FormTaskData } from "../../types/types";
import { getRandomDate } from "../../utils/utils";

const CategoryExampleData: Categories[] = [
  { description: "Training", id: 3, name: "Training" },
  { description: "Office", id: 2, name: "Office" },
  { description: "External", id: 4, name: "External" },
  { description: "Other", id: 6, name: "Other" },
];

const FormTaskViewExampleData = {};

const FormTaskEditExampleData: FormTaskData = {
  user: {},
  taskId: 9,
  name: "string",
  description: "string",
  isRequired: true,
  completed: true,
  creationDate: new Date(),
  completionDate: new Date(),
  comments: "string",
  categoryId: {
    id: 0,
    name: "string",
    description: "string",
  },
};

const RowsTaskExample: GridRowsProp = [
  {
    id: 1,
    name: "Percipio Training",
    description: "Finish the Training in Percipio",
    category: 3,
    creationDate: getRandomDate(),
    completionDate: new Date(2023, 12, 23),
    completed: true,
    required: false,
  },
  {
    id: 2,
    name: "Fun Event",
    description: "Finish the Training in Percipio",
    category: 2,
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
  {
    id: 3,
    name: "One & One meeting",
    description: "Finish the Training in Percipio",
    category: 4,
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: false,
    required: false,
  },
  {
    id: 4,
    name: "Percipio Training",
    description: "Finish TypeScript courses for cetifications",
    category: 3,
    creationDate: new Date(),
    completionDate: new Date(),
    completed: false,
    required: true,
  },
  {
    id: 5,
    name: "Required Fill",
    description: "Finish the Training in Percipio",
    category: 3,
    creationDate: new Date(),
    completionDate: new Date(2023, 12, 23),
    completed: false,
    required: true,
  },
  {
    id: 6,
    name: "Percipio Training",
    description: "Finish the Training in Percipio",
    category: 4,
    creationDate: getRandomDate(),
    completionDate: new Date(),
    completed: true,
    required: true,
  },
  {
    id: 7,
    name: "Create NanoDegree",
    description: "Finish the Training in Percipio",
    category: 3,
    creationDate: new Date(),
    completionDate: new Date(),
    completed: false,
    required: true,
  },
  {
    id: 8,
    name: "Vacations Request",
    description: "Finish the Training in Percipio",
    category: 6,
    creationDate: new Date(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
  {
    id: 9,
    name: "Percipio Training",
    description: "Finish the Training in Percipio",
    category: 3,
    creationDate: new Date(),
    completionDate: getRandomDate(),
    completed: true,
    required: true,
  },
  {
    id: 10,
    name: "Training",
    description: "Finish the Training in Percipio",
    category: 6,
    creationDate: new Date(),
    completionDate: new Date(),
    completed: true,
    required: false,
  },
  {
    id: 11,
    name: "Training",
    description: "Finish the Training in Percipio",
    category: 3,
    creationDate: getRandomDate(),
    completionDate: new Date(),
    completed: true,
    required: true,
  },
  {
    id: 12,
    name: "English Training",
    description: "Finish the Training in Percipio",
    category: 6,
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
];

export const GOOD_ANSWER_TASK =
  "Great job completing the task! Your dedication and efficiency are commendable. If you have any questions or need further assistance, feel free to reach out. Keep up the excellent work!";
export const REGULAR_ANSWER_TASK =
  "Thank you for completing the task. If you have any feedback or encounter any challenges, please let us know. We appreciate your efforts and are here to support you in any way we can.";
export const BAD_ANSWER_TASK =
  "I've noticed some challenges in the completion of the task. Let's discuss the difficulties you faced and work together to find a solution. Your improvement is important to us, and we are here to support you through any obstacles you may encounter.";

export {
  CategoryExampleData,
  FormTaskEditExampleData,
  FormTaskViewExampleData,
  RowsTaskExample,
};
