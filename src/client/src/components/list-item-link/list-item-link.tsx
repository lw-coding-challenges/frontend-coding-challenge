import {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";

export interface IProps {
  avatar?: React.ReactElement;
  icon?: React.ReactElement;
  textPrimary: string;
  to: string;
}

export const ListItemLink: FC<IProps> = (props) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<LinkProps, "to">>((itemProps, ref) => (
        <Link to={props.to} ref={ref} {...itemProps} />
      )),
    [props.to]
  );

  return (
    <ListItem button component={renderLink}>
      {props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : null}
      {props.avatar ? <ListItemAvatar>{props.avatar}</ListItemAvatar> : null}
      <ListItemText primary={props.textPrimary} />
    </ListItem>
  );
};
