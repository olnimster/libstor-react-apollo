import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Avatar} from "@material-ui/core";
import {AuthContext} from "../../Authorization/auth";
import s from "./Books.module.css";
import {NavLink} from "react-router-dom";
import {IMGPATH} from "../../Util/config";
import {OverrideProps} from "@material-ui/core/OverridableComponent";

type propsType = {
    avatar: string | null | undefined
}

const LoggedInMenuButton: React.FC<propsType> = ({avatar}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick: OverrideProps<any, any> = (event: { currentTarget: React.SetStateAction<null>; }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (_logout: any) => {
        setAnchorEl(null);
    };

    const { logout } = useContext(AuthContext);

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <Avatar src={`${IMGPATH}${avatar}`}/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <NavLink to='/profile' className={s.navlink}>
                    <MenuItem  onClick={handleClose}>Profile</MenuItem>
                </NavLink>
                <NavLink to='/account' className={s.navlink}>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                </NavLink>
                <MenuItem onClick={() => handleClose(logout())}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default LoggedInMenuButton;