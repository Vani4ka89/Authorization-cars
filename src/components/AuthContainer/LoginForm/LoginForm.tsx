import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {IAuth} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions} from "../../../store";

const LoginForm: FC = () => {
    const {
        reset, register, handleSubmit,
        formState: {isValid}
    } = useForm<IAuth>();
    const {error} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const login: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.login({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/cars');
        }
        reset();
    }

    return (
        <form onSubmit={handleSubmit(login)}>
            <input type="text" placeholder={'username'} {...register('username', {required: true})}/>
            <input type="text" placeholder={'password'} {...register('password', {required: true})}/>
            <button disabled={!isValid}>Login</button>
            {error && <div>username or password are incorrect</div>}
        </form>
    );
};

export {LoginForm};