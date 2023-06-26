import React from "react";
import ReactDOM from "react-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";
import Login from "./components/Login";
import Signup from "./components/Signup";

import {
    createBrowserRouter,
    RouterProvider,
    // Route,
    // Link,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/notes",
        element: <App />
    },
]);

ReactDOM.render(
    <RouterProvider router={router} />,
    document.getElementById("root")
);