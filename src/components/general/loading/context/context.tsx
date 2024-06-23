import React from "react";
import {ILoadingContext} from "./interface/interface";

export const LoadingContext = React.createContext<ILoadingContext>({
    loading: true,
    setLoading: () => {}
})