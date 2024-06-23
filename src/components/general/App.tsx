import React from "react";
import { BrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import HomePage from "../../pages/home/Admin.Home.page";
import Dashboard from "./dashboard/Dashboard";
import LoadingProvider from "./loading/LoadingProvider";
import NotFoundPage from "../../pages/404/404.page";
import NavProvider from "./nav/NavProvider";

import { MantineProvider } from "@mantine/core";
import { numeroTheme } from "./theme/NumeroTheme";
import { ModalsProvider } from "@mantine/modals";
import FileRoutes, { router } from "./routes/FileRoutes";
import { SchoolContextProvider } from "../../contexts/SchoolContext";

function App() {
    return (
        <LoadingProvider>
            <MantineProvider theme={numeroTheme}>
                {/* <BrowserRouter> */}

                {/* <SchoolContextProvider> */}
                {/* <ModalsProvider> */}
                {/* <NavProvider> */}
                {/* <FileRoutes /> */}
                <RouterProvider router={router} />
                {/* </NavProvider> */}
                {/* </ModalsProvider> */}
                {/* </SchoolContextProvider> */}

                {/* </BrowserRouter> */}
            </MantineProvider>
        </LoadingProvider>
    );
}

export default App;
