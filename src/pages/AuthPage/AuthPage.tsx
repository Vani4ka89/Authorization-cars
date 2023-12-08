import {FC} from 'react';
import {NavLink, Outlet} from "react-router-dom";

import css from './AuthPage.module.css';

const AuthPage: FC = () => {
    return (
        <div className={css.AuthPage}>
            <div className={css.links}>
                <NavLink to={'login'}>Login</NavLink>
                <NavLink to={'register'}>Register</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export {AuthPage};