import { FC, useEffect, useState } from "react";
import {
  EmployeesAllPerson,
  useEmployeesAll,
} from "../../queries/employee-all";
import { Routes } from "../../routes/routes";
import { Avatar, List } from "@material-ui/core";
import { ListItemLink } from "../list-item-link/list-item-link";

export const EmployeeList: FC = (props) => {
  const { loading, error, data } = useEmployeesAll();
  // TODO: debounce input
  const [searchTxt, setSearchTxt] = useState("");
  const [results, setResults] = useState<EmployeesAllPerson[] | undefined>();

  useEffect(() => {
    if (data) {
      const matches = data.people
        .filter(
          (p) =>
            p.name.first.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1 ||
            p.name.last.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1
        )
        .sort(
          (a, b) =>
            a.name.last.localeCompare(b.name.last) ||
            a.name.first.localeCompare(b.name.first)
        );
      setResults(matches);
    }
  }, [data, searchTxt]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Employees</h1>
      {data && results ? (
        <div>
          <input
            value={searchTxt}
            role="search"
            onChange={(e) => setSearchTxt(e.target.value)}
            placeholder="Search..."
          />
          <List>
            {results.map((p) => (
              <ListItemLink
                key={p.id}
                to={Routes.employee.edit.build({ id: p.id })}
                avatar={
                  <Avatar
                    alt={`${p.name.last}, ${p.name.first}`}
                    src={p.picture.thumbnail}
                  />
                }
                textPrimary={`${p.name.last}, ${p.name.first}`}
              />
            ))}
          </List>
        </div>
      ) : null}
      {loading ? <h4>Loading...</h4> : null}
      {error ? <h4>Error Loading Data</h4> : null}
      {data && data.people.length === 0 ? (
        <h4>No employees found in the database</h4>
      ) : null}
      {results != null && results.length === 0 ? (
        <h4>No employees found matching '{searchTxt}'...</h4>
      ) : null}
    </div>
  );
};
