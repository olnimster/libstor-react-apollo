import React, {useContext} from 'react';
import {AuthContext} from "../../Authorization/auth";
import Login from "../../Authorization/Login";
import LoggedInMenuButton from "./LoggedInMenuButton";


const AuthGroup = ({avatar}) => {
    const { user } = useContext(AuthContext);

    return (
            !user
                ?
                (<Login/>)
                :
                (<LoggedInMenuButton avatar={avatar}/>)

    );
};

export default AuthGroup;