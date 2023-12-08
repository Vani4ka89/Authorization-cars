import {createAsyncThunk, createSlice, isFulfilled, isRejected} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IAuth, IUser} from "../../interfaces";
import {authService} from "../../services";

interface IState {
    me: IUser;
    error: boolean;
}

const initialState: IState = {
    me: null,
    error: null
};

const register = createAsyncThunk<void, { user: IAuth }>(
    'authSlice/register',
    async ({user}, {rejectWithValue}) => {
        try {
            const {data} = await authService.register(user);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const login = createAsyncThunk<IUser, { user: IAuth }>(
    'authSlice/login',
    async ({user}, {rejectWithValue}) => {
        try {
            return await authService.login(user);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const me = createAsyncThunk<IUser, void>(
    'authSlice/me',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await authService.me();
            return data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setMe: state => {
            state.me = null;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.me = action.payload;
            })

            .addCase(me.fulfilled, (state, action) => {
                state.me = action.payload;
            })

            .addMatcher(isFulfilled(register, login), state => {
                state.error = false;
            })

            .addMatcher(isRejected(register, login), state => {
                state.error = true;
            })
});

const {reducer: authReducer, actions} = authSlice;

const authActions = {
    ...actions,
    register,
    login,
    me
};

export {
    authActions,
    authReducer
};