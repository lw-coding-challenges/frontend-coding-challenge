import { Button, Card, CardActions, CardContent, Container, makeStyles, styled, TextField } from "@material-ui/core";
import React, { FC } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEmployee } from "../../api/queries";
import { Routes } from "../../routes/routes";

const useStyles = makeStyles({
    input: {
        color: "white"
    },
    img: {
        width: "50vw",
        maxHeight: "40vh",
        objectFit: "contain",
        objectPosition: "bottom"
    },
    footer: {
        justifyContent: "flex-end"
    }
});

export interface IEmployeeEditParams {
    id: string;
}

const EmployeeTextField = styled(TextField)({
    marginLeft: "5px",
    marginTop: "10px"
  });

export const EmployeeEdit: FC = (props) => {
    const classes = useStyles();
    var params = useParams<IEmployeeEditParams>();
    const { loading, error, data } = useEmployee(parseInt(params.id));
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!data) return <p>Person not found: {params.id}</p>;

    return (        
    <Card>
        <CardContent>
            <img src={data.person.picture.large} alt={data.person.name.first} className={classes.img}/>
            <Container maxWidth="sm">
                <EmployeeTextField label="Title" defaultValue={data.person.name.title } />
                <EmployeeTextField label="First" defaultValue={data.person.name.first } />
                <EmployeeTextField label="Last" defaultValue={data.person.name.last } />
                <EmployeeTextField label="Email" defaultValue={data.person.email } />
            </Container>
        </CardContent>
        <CardActions className={classes.footer}>
            <Button component={Link} to={Routes.home.build()}>Cancel</Button>
            <Button variant="outlined">Save</Button>
        </CardActions>
    </Card>
    );
}