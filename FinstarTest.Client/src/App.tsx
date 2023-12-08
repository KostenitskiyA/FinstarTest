import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Navigation from "./components/Navigation";
import ObjectForm from "./components/ObjectForm";
import ObjectTable from "./components/ObjectTable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <h2>Тестовое задание выполнил Костеницкий Александр</h2>,
    },
    {
        path: "/create-objects",
        element: <ObjectForm/>,
    },
    {
        path: "/get-objects",
        element: <ObjectTable/>,
    },
]);

const App = () => {
    return (
        <>
            <Navigation/>
            <div style={{margin: "0 15%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <RouterProvider router={router}/>
            </div>
        </>
    );
};

export default App;
