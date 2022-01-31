import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {NavLink} from 'react-router-dom';
import style from './Books.module.css';
import {Divider} from "@material-ui/core";

const BooksButton = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    };
    const handleClose = (event, addr = '/') => {
        setAnchorEl(null);

    };

    return (
        <React.Fragment>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Books
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <NavLink to='/newbooks' className={style.navlink}>
                    <MenuItem onClick={handleClose}> New Books</MenuItem>
                </NavLink>
                <NavLink to='/allbooks' className={style.navlink}>
                    <MenuItem onClick={handleClose}>All books</MenuItem>
                </NavLink>
                <Divider variant="middle"/>
                <NavLink to='/genre' className={style.navlink}>
                    <MenuItem onClick={handleClose}>GENRE</MenuItem>
                </NavLink>
            </Menu>
        </React.Fragment>
    );
}

export default BooksButton;