import { GridRowsProp } from "@mui/x-data-grid";
import { FormTaskData } from "../../types/types";
import { getRandomDate } from "../../utils/utils";

const CategoriExampleData = ["Training", "Office", "External", "Other"];

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
    categori: "Office",
    creationDate: getRandomDate(),
    completionDate: new Date(2023, 12, 23),
    completed: true,
    required: false,
  },
  {
    id: 2,
    name: "Fun Event",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
  {
    id: 3,
    name: "One & One meeting",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: false,
    required: false,
  },
  {
    id: 4,
    name: "Percipio Training",
    description: "Finish TypeScript courses for cetifications",
    categori: "Training",
    creationDate: new Date(),
    completionDate: new Date(),
    completed: false,
    required: true,
  },
  {
    id: 5,
    name: "Required Fill",
    description: "Finish the Training in Percipio",
    categori: "Office",
    creationDate: new Date(),
    completionDate: new Date(2023, 12, 23),
    completed: false,
    required: true,
  },
  {
    id: 6,
    name: "Percipio Training",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: getRandomDate(),
    completionDate: new Date(),
    completed: true,
    required: true,
  },
  {
    id: 7,
    name: "Create NanoDegree",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: new Date(),
    completionDate: new Date(),
    completed: false,
    required: true,
  },
  {
    id: 8,
    name: "Vacations Request",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: new Date(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
  {
    id: 9,
    name: "Percipio Training",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: new Date(),
    completionDate: getRandomDate(),
    completed: true,
    required: true,
  },
  {
    id: 10,
    name: "Training",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: new Date(),
    completionDate: new Date(),
    completed: true,
    required: false,
  },
  {
    id: 11,
    name: "Training",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: getRandomDate(),
    completionDate: new Date(),
    completed: true,
    required: true,
  },
  {
    id: 12,
    name: "English Training",
    description: "Finish the Training in Percipio",
    categori: "Training",
    creationDate: getRandomDate(),
    completionDate: getRandomDate(),
    completed: true,
    required: false,
  },
];

export {
  CategoriExampleData,
  FormTaskEditExampleData,
  FormTaskViewExampleData,
  RowsTaskExample,
};
