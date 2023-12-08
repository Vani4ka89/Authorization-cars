import {FC, useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {authService} from "../../services";
import {authActions} from "../../store";

const Header: FC = () => {
    const {me} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (authService.getAccessToken() && !me) {
            dispatch(authActions.me());
        }
    }, [me, dispatch]);


    const doneExit = () => {
        authService.deleteTokens();
        navigate('/auth/login');
        dispatch(authActions.setMe());
    }


    return (
        <div className={css.Header}>
            {
                me
                    ?
                    <div style={{color: 'snow'}}>
                        {me.username} - {new Date(me.last_login).toDateString()}
                        <button onClick={doneExit}>Log out</button>
                    </div>
                    :
                    <div className={css.Header}>
                        {/*<NavLink to={'cars'}>Cars</NavLink>*/}
                        {/*<NavLink to={'users'}>Users</NavLink>*/}
                        <NavLink to={'auth/login'}>Authorization to Cars</NavLink>
                    </div>
            }
        </div>
    );
};

export {Header};