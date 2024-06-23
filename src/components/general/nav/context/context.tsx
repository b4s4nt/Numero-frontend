import React from "react";
import {INavContext} from "../interface/interface";

export const NavContext = React.createContext<INavContext>({navOpen: false, toggleNav: () => {}})