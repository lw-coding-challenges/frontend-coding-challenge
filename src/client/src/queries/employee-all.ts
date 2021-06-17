import { gql, useQuery } from "@apollo/client";

export const useEmployeesAll = () => useQuery<EmployeesAllQuery>(gql`{
    people {
      id
      name {
        last
        first
      }
      picture {
        thumbnail
      }
    }
  }`);

export interface EmployeesAllQuery {
    people: EmployeesAllPerson[];
}

export interface EmployeesAllPerson {
    id: string;
    name: {
      first: string;
      last: string;
    };
    picture: {
      thumbnail: string;
    }
}