import {configureStore} from "@reduxjs/toolkit";

import {authReducer, carReducer} from "./slices";

const store = configureStore({
    reducer: {
        cars: carReducer,
        auth: authReducer
    }
});

export {store};