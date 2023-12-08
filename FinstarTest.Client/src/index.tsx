import React from "react";
import App from "./App";
import {Provider} from "react-redux";
import {setupStore} from "./store";
import {createRoot} from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';

const store = setupStore();

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App/>
    </Provider>
);