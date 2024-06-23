import { createContext, useEffect, useState } from "react";
import { School } from "../interfaces/School";
import ListSchool from "../networking/api/School/ListSchool";
import SchoolImage from "../images/school.png";

interface IAdminContext {
    children: React.ReactNode;
}

interface AdminContextType {
    schools: School[];
    fetchSchools: () => void;
}

export const AdminContext = createContext<AdminContextType>({
    schools: [] as School[],
    fetchSchools: () => {},
});

export const AdminContextProvider = ({ children }: IAdminContext) => {
    const [schools, setSchools] = useState<School[]>([]);

    const fetchSchools = async () => {
        const req = new ListSchool();
        const res = await req.fetch();

        if (res.success) {
            console.log("🚀 TCL ~ file: AdminContext.tsx:28 ~ fetchSchools ~ res", res.data);

            setSchools(
                res.data.data.map((school: School) => ({
                    ...school,
                    image: SchoolImage,
                }))
            );
        } else {
            console.log(res.error);
        }
    };

    useEffect(() => {
        fetchSchools();
    }, []);

    return (
        <AdminContext.Provider
            value={{
                schools,
                fetchSchools,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};
