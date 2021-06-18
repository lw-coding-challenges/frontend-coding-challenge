import { EmployeesAllPerson } from "../queries/employee-all";

const person1: EmployeesAllPerson = {
  id: "0",
  name: {
    last: "Stoeten",
    first: "Marloes",
  },
  picture: {
    thumbnail: "https://randomuser.me/api/portraits/thumb/women/39.jpg",
  },
};

const person2: EmployeesAllPerson = {
  id: "1",
  name: {
    last: "Rodrigues",
    first: "Leonardo",
  },
  picture: {
    thumbnail: "https://randomuser.me/api/portraits/thumb/men/4.jpg",
  },
};

export const People = {
  person1,
  person2,
};
