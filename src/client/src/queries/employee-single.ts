import { gql, useQuery } from "@apollo/client";

export const EmployeeSingleGql = gql`
  query PersonSingle($id: ID!) {
    person(id: $id) {
      id
      email
      name {
        first
        last
        title
      }
      picture {
        large
      }
    }
  }
`;

export const useEmployee = (id: number) =>
  useQuery<EmployeeQuery>(EmployeeSingleGql, { variables: { id } });

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
  };
  picture: {
    large: string;
  };
}
