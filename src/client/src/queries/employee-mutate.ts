import { gql, useMutation } from "@apollo/client";

export const useEmployeeMutate = () => useMutation<EmployeeMutatePerson, EmployeeMutateVariables>(gql`
mutation EditPerson($id: ID!, $input: EditPerson) { 
    editPerson(id: $id, payload: $input) {
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
`);

  export interface EmployeeMutateVariables {
      id: number;
      input: EmployeeMutateInput;
  }

  export interface EmployeeMutateInput {
    title: string;
    first: string;
    last: string;
    email: String;
  }

  export interface EmployeeMutatePerson {
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