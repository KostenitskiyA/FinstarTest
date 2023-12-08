import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {DomainObject} from "../../types/DomainObject";
import {CreatedObject} from "../../types/CreatedObject";

export const objectsApi = createApi({
    reducerPath: 'objectsApi',
    tagTypes: ['Objects'],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5288'}),
    endpoints: (build) => ({
        getObjects: build.query<
            { objects: DomainObject[], total: number, pageCount: number },
            { filter: CreatedObject, pageNumber: number }>
        ({
            query: (requestObjects) => ({
                url: 'api/objects/get-objects/' + requestObjects.pageNumber,
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestObjects.filter)
            }),
        }),
        createObjects: build.mutation<null, CreatedObject[]>({
            query: (createdObjects) => ({
                url: 'api/objects/create-objects',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: Object.fromEntries(createdObjects.map((object) =>
                    [object.code.toString(), object.value]))
            }),
        }),

    }),
});

export type ObjectsApiState = ReturnType<typeof objectsApi['reducer']>;

export const {
    useGetObjectsQuery,
    useCreateObjectsMutation
} = objectsApi;
