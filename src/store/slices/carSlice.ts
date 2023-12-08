import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {ICar, IPagination} from "../../interfaces";
import {carService} from "../../services";

interface IState {
    cars: ICar[];
    car: ICar;
    trigger: boolean;
    prevPage: string;
    nextPage: string;
    carForUpdate: ICar;
    error: boolean;
}

const initialState: IState = {
    cars: [],
    car: null,
    trigger: false,
    prevPage: null,
    nextPage: null,
    carForUpdate: null,
    error: null
};

const getAll = createAsyncThunk<IPagination<ICar>, void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
);

const create = createAsyncThunk<ICar, { car: ICar }>(
    'carSlice/create',
    async ({car}, {rejectWithValue}) => {
        try {
            await carService.create(car);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const update = createAsyncThunk<ICar, { id: number, car: ICar }>(
    'carSlice/update',
    async ({id, car}, {rejectWithValue}) => {
        try {
            await carService.updateById(id, car)
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const deleteCar = createAsyncThunk<void, { id: number }>(
    'carSlice/deleteCar',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.deleteById(id);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const addPhoto = createAsyncThunk<ICar, { id: number, photo: FormData }>(
    'carSlice/addPhoto',
    async ({id, photo}, {rejectWithValue}) => {
        try {
            await carService.addPhoto(id, photo);
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response.data);
        }
    }
)

const carSlice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload;
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                const {items, next, prev} = action.payload;
                state.cars = items;
                state.prevPage = prev;
                state.nextPage = next;
            })

            .addMatcher(isFulfilled(create, update, deleteCar, addPhoto), state => {
                state.trigger = !state.trigger;
            })
});

const {reducer: carReducer, actions} = carSlice;

const carActions = {
    ...actions,
    getAll,
    create,
    update,
    deleteCar,
    addPhoto
};

export {
    carActions,
    carReducer
};