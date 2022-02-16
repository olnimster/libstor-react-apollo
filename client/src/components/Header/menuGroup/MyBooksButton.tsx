import React from "react";
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import s from "./Books.module.css";

export const MyBooksButton: React.FC<any> = ({userId}) => {
   return (
       <NavLink to={`/bookshelf/${userId}`} className={s.navlink}>
          <Button>MyBooks</Button>
       </NavLink>
   );
}

