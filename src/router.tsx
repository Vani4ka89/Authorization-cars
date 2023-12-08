import {createBrowserRouter, Navigate} from "react-router-dom";

import {MainLayout} from "./layouts";
import {AuthPage, CarsPage, UsersPage} from "./pages";
import {LoginForm, RegisterForm} from "./components";
import {RequiredAuth} from "./hoc/RequiredAuth";

const router = createBrowserRouter([
    {
        path: '', element: <MainLayout/>, children: [
            {index: true, element: <Navigate to={'auth'}/>},
            {
                path: 'auth', element: <AuthPage/>, children: [
                    {path: 'login', element: <LoginForm/>},
                    {path: 'register', element: <RegisterForm/>}
                ]
            },
            {path: 'cars', element: <RequiredAuth><CarsPage/></RequiredAuth>},
            {path: 'users', element: <UsersPage/>}
        ]
    }
]);

export {router};