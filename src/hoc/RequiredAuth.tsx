import {FC, ReactElement} from 'react';
import {Navigate} from "react-router-dom";

import {authService} from "../services";

interface IProps {
    children: ReactElement;
}

const RequiredAuth: FC<IProps> = ({children}) => {
    const access = authService.getAccessToken();

    if (!access) {
        return <Navigate to={'/auth/login'}/>
    }
    return children;
};

export {RequiredAuth};