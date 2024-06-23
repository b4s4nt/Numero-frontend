import {themes} from "../ThemeProvider";

export interface IThemeContext {
    toggleTheme?: () => void
    getTheme?: () => themes
    getNonTheme?: () => themes
}