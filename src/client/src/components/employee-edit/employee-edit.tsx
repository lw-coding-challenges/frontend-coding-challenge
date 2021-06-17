import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  makeStyles,
  styled,
  TextField,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { EmployeeMutateInput, useEmployeeMutate } from "../../queries/employee-mutate";
import { useEmployee } from "../../queries/employee-single";
import { Routes } from "../../routes/routes";

const useStyles = makeStyles({
  input: {
    color: "white",
  },
  img: {
    width: "50vw",
    maxHeight: "40vh",
    objectFit: "contain",
    objectPosition: "bottom",
  },
  footer: {
    justifyContent: "flex-end",
  },
});

export interface IEmployeeEditParams {
  id: string;
}

const EmployeeTextField = styled(TextField)({
  marginLeft: "5px",
  marginTop: "10px",
});

const fieldName = (key: keyof EmployeeMutateInput) => key.toString();

export const EmployeeEdit: FC = (props) => {
  const classes = useStyles();
  var params = useParams<IEmployeeEditParams>();
  const { loading, error, data } = useEmployee(parseInt(params.id));
  const [ updateEmployee ] = useEmployeeMutate();
  const [formValues, setFormValues] = useState<Partial<EmployeeMutateInput>>({});
  const history = useHistory();

  useEffect(() => {
    if (data) {
      setFormValues({
        title: data.person.name.title,
        first: data.person.name.first,
        last: data.person.name.last,
        email: data.person.email,
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) return <p>Person not found: {params.id}</p>;

  const onSubmit = async (values: EmployeeMutateInput) => {
    await updateEmployee({
        variables: {
            id: data.person.id,
            input: values
        }
    });

    history.push(Routes.home.build());
  };

  return (
    <Form
      initialValues={formValues}
      onSubmit={onSubmit}
      render={(formProps) => (
        <form onSubmit={formProps.handleSubmit}>
          <Card>
            <CardContent>
              <img
                src={data.person.picture.large}
                alt={data.person.name.first}
                className={classes.img}
              />
              <Container maxWidth="sm">
                <Field name="title" value={data.person.name.title}>
                  {(renderProps) => (
                    <EmployeeTextField
                      label="Title"
                      InputProps={renderProps.input}
                    />
                  )}
                </Field>
                <Field name={fieldName("first")}>
                  {(renderProps) => (
                    <EmployeeTextField
                      label="First"
                      InputProps={renderProps.input}
                    />
                  )}
                </Field>
                <Field name={fieldName("last")}>
                  {(renderProps) => (
                    <EmployeeTextField
                      label="Last"
                      InputProps={renderProps.input}
                    />
                  )}
                </Field>
                <Field name={fieldName("email")}>
                  {(renderProps) => (
                    <EmployeeTextField
                      label="Email"
                      InputProps={renderProps.input}
                    />
                  )}
                </Field>
              </Container>
            </CardContent>
            <CardActions className={classes.footer}>
              <Button component={Link} to={Routes.home.build()}>
                Cancel
              </Button>
              <Button type="submit" variant="outlined">
                Save
              </Button>
            </CardActions>
          </Card>
        </form>
      )}
    />
  );
};
