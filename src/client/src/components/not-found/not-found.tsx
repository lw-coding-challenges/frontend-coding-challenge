import React, { FC } from "react"
import { Link } from "react-router-dom"

export const NotFound: FC = (props) => {
    return (
        <div>Could not find the page you were looking for.  Go back to the <Link to={"/"}>home page</Link> and try again.</div>
    )
}