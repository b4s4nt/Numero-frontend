import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ThemeContext } from "./context/context";
import { LoadingContext } from "../loading/context/context";

interface IProps {
    children?: React.ReactElement
}

export enum themes {
    light = "light",
    dark = "dark"
}

function ThemeProvider({ children }: IProps) {
    const [theme, setTheme] = useState<themes>()
    const { setLoading } = useContext(LoadingContext)

    useEffect(() => {
        setLoading(true)
        const storedTheme = localStorage.getItem("theme");
        if (!storedTheme) {
            const body = getBody()
            if (body) {
                const darkThemeMq = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)");
                if (darkThemeMq?.matches) {
                    setTheme(themes.light)
                } else {
                    const current = body.className
                    setTheme(current as themes)
                }
            }
        } else {
            setTheme(storedTheme as themes)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])

    useEffect(() => {
        if (theme) {
            setThemeToBody()
            localStorage.setItem("theme", theme);
        }
    }, [theme])

    function getBody(): HTMLElement | null {
        return document.getElementById("body")
    }

    const setThemeToBody = useCallback(() => {
        const body = getBody()
        if (body) {
            body.className = theme as string
        }
    }, [theme])

    const toggleTheme = useCallback(() => {
        setTheme(theme === themes.light ? themes.dark : themes.light)
    }, [theme])

    const getTheme = useCallback(() => {
        const themeCopy = `${theme}`
        return themeCopy as themes
    }, [theme])

    const getNonTheme = useCallback(() => {
        const themeCopy = `${theme}`
        return themeCopy === themes.dark ? themes.light : themes.dark as themes;
    }, [theme])

    return (
        <>
            <ThemeContext.Provider value={{ toggleTheme, getTheme, getNonTheme }}>
                {children}
            </ThemeContext.Provider>
        </>
    );
}

export default ThemeProvider
