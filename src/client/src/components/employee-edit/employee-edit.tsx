import { FC } from "react";
import { useParams } from "react-router";
import { useEmployee } from "../../api/queries";
import "./employee-edit.scss";

export interface IEmployeeEditParams {
    id: string;
}

export const EmployeeEdit: FC = (props) => {
    var params = useParams<IEmployeeEditParams>();
    const { loading, error, data } = useEmployee(parseInt(params.id));
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    if (!data) return <p>Person not found: {params.id}</p>;

    return (        
    <div className="card">
        <img src={data.person.picture.large} alt={data.person.name.first}/>
        <h1>{data.person.name.title} {data.person.name.first} {data.person.name.last}</h1>
        <p className="title">{data.person.email}</p>
        <p></p>
    </div>
    );
}