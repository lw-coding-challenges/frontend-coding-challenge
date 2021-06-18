import { fireEvent, render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { EmployeeList } from "./employee-list";
import { EmployeesAllGql } from "../../queries/employee-all";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";
import { People } from "../../test-data/people";

test("loads and displays employees", async () => {
  const mocks = [
    {
      request: {
        query: EmployeesAllGql,
      },
      result: {
        data: {
          people: [People.person1, People.person2],
        },
      },
    },
  ];
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const listItems = screen.getAllByRole("button");
  expect(listItems.length).toBe(2);
});

test("displays a message if no employees loaded", async () => {
  const mocks = [
    {
      request: {
        query: EmployeesAllGql,
      },
      result: {
        data: {
          people: [],
        },
      },
    },
  ];
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  const msg = screen.getByText("No employees found in the database");
  expect(msg).toBeInTheDocument();
});

test("displays a message if no people match search", async () => {
  const mocks = [
    {
      request: {
        query: EmployeesAllGql,
      },
      result: {
        data: {
          people: [People.person1, People.person2],
        },
      },
    },
  ];
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  fireEvent.change(screen.getByRole("search"), { target: { value: "blah" } });

  const msg = screen.getByText("No employees found matching 'blah'...");
  expect(msg).toBeInTheDocument();
});

test("allows searching by first name", async () => {
  const mocks = [
    {
      request: {
        query: EmployeesAllGql,
      },
      result: {
        data: {
          people: [People.person1, People.person2],
        },
      },
    },
  ];
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <EmployeeList />
      </MockedProvider>
    </MemoryRouter>
  );

  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });

  fireEvent.change(screen.getByRole("search"), {
    target: { value: People.person1.name.first },
  });

  const listItems = screen.getAllByRole("button");
  expect(listItems.length).toBe(1);
});
