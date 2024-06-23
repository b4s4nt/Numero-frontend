import React, { useState } from "react";
import { LoadingContext } from "./context/context";

const LoadingProvider = ({ children }: { children: React.ReactElement }) => {
    const [loading, setLoading] = useState<boolean>(true);
    return (
        <>
            <LoadingContext.Provider value={{ loading, setLoading }}>{children}</LoadingContext.Provider>
        </>
    );
};

export default LoadingProvider;
