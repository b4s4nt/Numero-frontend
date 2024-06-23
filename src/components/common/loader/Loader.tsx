import React, {useEffect, useState} from "react"

export enum loaderSize {
    small = "small",
    medium = "medium",
    large = "large"
}

export enum loaderOpacity {
    total = "total",
    semi = "semi",
    none = "none"
}

interface IProps {
    opacity?: loaderOpacity
    fluid?: boolean
    fullscreen?: boolean
    cover?: boolean
    size?: loaderSize
}

const Loader = (props : IProps) => {
    const [classString, setClassString] = useState<string>("loaderContainer")
    const [loaderString, setLoaderString] = useState<string>("loader full-loader")


    useEffect(() => {
        if (Object.entries(props)?.length){
            let cpState = classString
            let cpLoaderState = loaderString
            Object.entries(props).forEach(entry => {
                const prop = entry[0]
                const value = entry[1]
                if (value && typeof value === "boolean") {
                    cpState += ` ${prop}`
                } else if (value && typeof value === "string") {
                    switch (prop) {
                        case "size":
                            cpLoaderState += ` ${value}`
                            break;
                        case "opacity":
                            cpLoaderState += ` opacity-${value}`
                            break;
                    }
                    setLoaderString(cpLoaderState)
                }
            })
            setClassString(cpState);
        }
    }, [])

    return (
        <div className={classString}>
            <a className={loaderString}></a>
        </div>
    )
}

export default Loader