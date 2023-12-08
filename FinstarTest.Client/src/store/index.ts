import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {objectsApi} from "./modules/objects-api";

const rootReducer = combineReducers({
    [objectsApi.reducerPath]: objectsApi.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(objectsApi.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AddDispatch = AppStore['dispatch']