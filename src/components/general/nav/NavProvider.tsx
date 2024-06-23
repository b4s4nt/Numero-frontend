import React, { useContext, useEffect, useState } from "react";
import { NavContext } from "./context/context";
import { useLocation } from "react-router-dom";
import { closeAllModals } from "@mantine/modals";
import { LoadingContext } from "../loading/context/context";

interface IProps {
    children?: React.ReactElement;
}

function NavProvider({ children }: IProps) {
    const [open, setOpen] = useState<boolean>(false);
    const location = useLocation();
    const { loading, setLoading } = useContext(LoadingContext);

    const toggleNav = () => {
        setOpen(!open);
    };

    useEffect(() => {
        function resizeWindow() {
            setOpen(false);
        }
        window.addEventListener("resize", resizeWindow);
        return () => {
            window.removeEventListener("resize", resizeWindow);
        };
    }, []);

    useEffect(() => {
        setOpen(false);
        closeAllModals();

        // TODO: this is a hack to get the loading screen to work
        setLoading(true);
    }, [location]);

    return (
        <>
            <NavContext.Provider value={{ navOpen: open, toggleNav }}>{children}</NavContext.Provider>
        </>
    );
}

export default NavProvider;
