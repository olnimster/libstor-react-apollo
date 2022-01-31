import React from 'react';
import s from './page404.module.css'
import {Link} from "react-router-dom";

export const Page404 = () => {
    return (
        <div className={s.container}>
            <h1>Oops!</h1>
            <h3>404 - PAGE NOT FOUND</h3>
            <p>The page you are looking for might be removed or temporarily unavailable</p>
            <Link to='/'>
                <button>GOTO HOMEPAGE</button>
            </Link>
        </div>
    );
};
