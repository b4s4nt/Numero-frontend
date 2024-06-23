// REACT IMPORTS

import { Divider, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openModal } from "@mantine/modals";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Class } from "../../../interfaces/Class";
import NumeroButton from "../button/Button";
import SimpleModalContent from "../modal/SimpleModalContent";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

import ClearData from "../../../images/numero-delete.png";
import { SchoolContext } from "../../../contexts/SchoolContext";
import DeleteClass from "../../../networking/api/Class/DeleteClass";
import { openSimpleModal } from "../modal/openModalFn";

interface Props {
    classId: string;
}

const ClassForm = ({ classId }: Props) => {
    const { schoolId, classes, fetchClasses } = useContext(SchoolContext);
    const [currentClass, setCurrentClass] = useState<Class>({} as Class);

    const form = useForm({
        initialValues: {
            name: "",
            number: 0,
            teacher: "",
        },
    });

    const fetchDeleteClass = async (schoolId: string, class_id: string) => {
        console.log("🚀 TCL ~ file: ClassForm.tsx:48 ~ fetchDeleteClass ~ schoolId, class_id", schoolId, class_id);
        const req = new DeleteClass(schoolId, class_id);
        const res = await req.fetch();

        if (res.success) {
            fetchClasses(schoolId);

            openSimpleModal({
                children: <SimpleModalContent title={"Class data has been successfully cleared."} img={ClearData} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.log("error", res.error);
        }
    };

    const handleClear = () => {
        if (!schoolId) return;

        console.log("clear class data");

        fetchDeleteClass(schoolId, classId);
    };

    useEffect(() => {
        // TODO: Fetch class data
        if (!classId || !classes) return;
        console.log("🚀 TCL ~ file: ClassForm.tsx:79 ~ useEffect ~ classId", classId);
        console.log("🚀 TCL ~ file: ClassForm.tsx:85 ~ useEffect ~ classes", classes);

        const c = classes.filter((c) => c.id === classId)[0];
        console.log("currentClass", currentClass);

        if (c) setCurrentClass(c);
    }, []);

    useEffect(() => {
        if (Object.keys(currentClass).length === 0 || currentClass.students.length === 0) return;
        console.log("🚀 TCL ~ file: ClassForm.tsx:71 ~ useEffect ~ currentClass", currentClass);

        form.setValues({
            name: currentClass.name,
            number: currentClass.students.length,
            teacher: `${currentClass.teacher.firstName} ${currentClass.teacher.lastName}`,
        });
    }, [currentClass]);

    return (
        <form>
            <Stack>
                <TextInput disabled label="Class Name" {...form.getInputProps("name")} />
                <TextInput disabled label="Number of Students" {...form.getInputProps("number")} />
                <TextInput disabled label="Teacher" {...form.getInputProps("teacher")} />
            </Stack>

            <Divider my={30} />

            <Group>
                <NumeroButton type="button" label="Yes, Clear Data" onClick={handleClear} />
                <NumeroButton type="button" label="Discard Changes" variant="subtle" onClick={() => closeAllModals()} />
            </Group>
        </form>
    );
};

export default ClassForm;
