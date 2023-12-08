import { combineReducers } from '@reduxjs/toolkit';
import {objectsApi} from "../modules/objects-api";

export type ApplicationState = {};

export default () =>
    combineReducers<ApplicationState>({
        [objectsApi.reducerPath]: objectsApi.reducer,
    });
