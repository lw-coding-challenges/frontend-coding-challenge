import { gql, useQuery } from "@apollo/client";

export const useEmployeesAll = () => useQuery<EmployeesAllQuery>(gql`{
    people {
      id
      name {
        last
        first
      }
    }
  }`);

export interface EmployeesAllQuery {
    people: EmployeesAllPerson[];
}

export interface EmployeesAllPerson {
    id: string;
    name: {
        last: string;
        first: string;
    }
}