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

export const useEmployee = (id: number) => useQuery<EmployeeQuery>(gql`{
  person (id: ${id}) { 
    id
    email
    name {
      first
      last
      title
    }
    picture{
      large
    }
  }
}`);

export interface EmployeeQuery {
  person: EmployeeQueryPerson;
}

export interface EmployeeQueryPerson {
  id: number;
  email: string;
  name: {
    first: string;
    last: string;
    title: string;
  }
  picture: {
    large: string;
  }
}