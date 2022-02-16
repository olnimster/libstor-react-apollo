import React, {useContext} from 'react';
import {AuthContext} from "../../Authorization/auth";
import Login from "../../Authorization/Login";
import LoggedInMenuButton from "./LoggedInMenuButton";

type propsType = {
    avatar: string | null | undefined
}

const AuthGroup: React.FC<propsType> = ({avatar}) => {

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