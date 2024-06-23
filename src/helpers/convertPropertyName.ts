export const camelToUnderline = (str: string) => {
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
};

export const camelToSpace = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").toLowerCase();
};

export const objectPropertiesToUnderline = (obj: any) => {
    let newObj: any = {};
    for (let key in obj) {
        newObj[camelToUnderline(key)] = obj[key];
    }
    return newObj;
};
