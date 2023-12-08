import {FC} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {IAuth} from "../../../interfaces";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {authActions} from "../../../store";

const RegisterForm: FC = () => {
    const {
        reset, register, handleSubmit,
        formState: {isValid}
    } = useForm<IAuth>();
    const {error} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerUser: SubmitHandler<IAuth> = async (user) => {
        const {meta: {requestStatus}} = await dispatch(authActions.register({user}));
        if (requestStatus === 'fulfilled') {
            navigate('/auth/login');
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit(registerUser)}>
            <input type="text" placeholder={'username'} {...register('username', {required: true})}/>
            <input type="text" placeholder={'password'} {...register('password', {required: true})}/>
            <button disabled={!isValid}>Register</button>
            {error && <div>user already exist</div>}
        </form>
    );
};

export {RegisterForm};