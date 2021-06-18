import { gql, useQuery } from "@apollo/client";

export const EmployeesAllGql = gql`{
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
}`;

export const useEmployeesAll = () => useQuery<EmployeesAllQuery>(EmployeesAllGql);

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