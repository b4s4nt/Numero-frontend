// REACT IMPORTS
import { useState, useEffect, useContext } from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../button/Button";
import SimpleModalContent from "../modal/SimpleModalContent";

// MANTINE IMPORTS
import { Stack, TextInput, Divider, Group, LoadingOverlay } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";

// NETWORK IMPORTS
import AddTeacher from "../../../networking/api/Teacher/AddTeacher";
import EditTeacher from "../../../networking/api/Teacher/EditTeacher";
import DeleteTeacher from "../../../networking/api/Teacher/DeleteTeacher";

// TYPE IMPORTS

// FUNCTION IMPORTS
import { SchoolContext } from "../../../contexts/SchoolContext";
import { capFirstLetterOfEachWord } from "../../../helpers/helpers";
import { Teacher } from "../../../interfaces/Teacher";

// STYLE IMPORTS
import ClearData from "../../../images/numero-delete.png";
import AddTeacherImage from "../../../images/numero-add.png";
import ConfirmTeacherImage from "../../../images/numero-confirm.png";
import { objectPropertiesToUnderline } from "../../../helpers/convertPropertyName";
import { openSimpleModal } from "../modal/openModalFn";

interface ITeacherFormProps {
    type: "add" | "edit" | "delete";
    teacherId?: number;
}

function TeacherForm({ type, teacherId }: ITeacherFormProps) {
    const { schoolId, teachers, fetchTeachers } = useContext(SchoolContext);

    const [teacher, setTeacher] = useState<null | Teacher>(null);
    const [loading, toggleLoading] = useToggle();

    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        validateInputOnChange: true,
        validateInputOnBlur: true,
        validate: {
            firstName: (value: string) => (value.trim().length > 0 ? null : "First name is required"),
            lastName: (value: string) => (value.trim().length > 0 ? null : "Last name is required"),
            // email validation in australia
            email: (value: string) => {
                const emailRegex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isValid = emailRegex.test(value);
                return isValid ? null : "Email is invalid";
            },

            // phone number validation in australia
            phone: (value: string) => {
                let isValid = true;
                if (value.length === 10) {
                    const phoneRegex = /^(\+61|0061|61|0)?\s?4[0-9]{8}$/;
                    isValid = phoneRegex.test(value);
                } else {
                    isValid = false;
                }
                return isValid ? null : "Phone number is invalid";
            },
        },
        transformValues: (values) => {
            // capitalize first letter of first name and last name
            const firstName = capFirstLetterOfEachWord(values.firstName);
            const lastName = capFirstLetterOfEachWord(values.lastName);
            // convert email to lowercase
            const email = values.email.toLowerCase();

            return { ...values, firstName, lastName, email };
        },
    });

    async function fetchAddTeacher(schoolId: string, teacher: Partial<Teacher>) {
        toggleLoading();

        const req = new AddTeacher(schoolId);
        const input = objectPropertiesToUnderline({ ...teacher, schoolId: parseInt(schoolId) });
        req.input(input);
        const res = await req.fetch();

        if (res.success) {
            console.log("Add Teacher Success");
            toggleLoading();

            // refresh teacher list
            fetchTeachers(schoolId);

            // Display success modal
            openSimpleModal({
                children: <SimpleModalContent title={`Teacher has been successfully added.`} img={AddTeacherImage} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.log("Add Teacher Failed");
        }
    }

    async function fetchEditTeacher(schoolId: string, teacherId: number, teacher: Partial<Teacher>) {
        toggleLoading();

        const req = new EditTeacher(schoolId, `${teacherId}`);
        const input = objectPropertiesToUnderline({ ...teacher, id: teacherId, schoolId: schoolId });
        console.log("🚀 TCL ~ file: TeacherForm.tsx:124 ~ fetchEditTeacher ~ input", input);
        req.input(input);
        const res = await req.fetch();

        console.log("🚀 TCL ~ file: TeacherForm.tsx:129 ~ fetchEditTeacher ~ res", res);
        if (res.success) {
            console.log("Edit Teacher Success");
            toggleLoading();

            // refresh teacher list
            fetchTeachers(schoolId);

            // Display success modal
            openSimpleModal({
                children: (
                    <SimpleModalContent title={`Teacher has been successfully edited.`} img={ConfirmTeacherImage} />
                ),
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.log("Edit Teacher Failed");
        }
    }

    async function fetchDeleteTeacher(schoolId: string, teacherId: number) {
        toggleLoading();

        const req = new DeleteTeacher(schoolId, `${teacherId}`);
        const res = await req.fetch();

        if (res.success) {
            console.log("Delete Teacher Success");
            toggleLoading();

            // refresh teacher list
            fetchTeachers(schoolId);

            // Display success modal
            openSimpleModal({
                children: <SimpleModalContent title={"Teacher has been successfully deleted."} img={ClearData} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.log("Delete Teacher Failed");
        }
    }

    const handleSubmit = form.onSubmit((values) => {
        if (type === "add") {
            if (!schoolId) return;

            fetchAddTeacher(schoolId, values);
        } else if (type === "edit") {
            if (!schoolId || !teacherId) return;

            fetchEditTeacher(schoolId, teacherId, values);
        } else {
            console.log("Something went wrong");
        }
    });

    const handleDeleteTeacher = () => {
        console.log("delete teacher");
        if (!teacherId || !schoolId) return;
        fetchDeleteTeacher(schoolId, teacherId);
    };

    useEffect(() => {
        if (!teacherId || !schoolId) return;
        fetchTeachers(schoolId);

        // fetch teacher data
        setTeacher(teachers.filter((teacher) => teacher.id === teacherId)[0]);
    }, [teacherId]);

    useEffect(() => {
        if (!teacher) return;

        form.setValues({
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            email: teacher.email,
            phone: teacher.phone,
        });
    }, [teacher]);

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <LoadingOverlay visible={loading} />

                <TextInput
                    disabled={type === "delete"}
                    label="First Name"
                    placeholder="First Name"
                    {...form.getInputProps("firstName")}
                />
                <TextInput
                    disabled={type === "delete"}
                    label="Last Name"
                    placeholder="Last Name"
                    {...form.getInputProps("lastName")}
                />
                <TextInput
                    disabled={type === "delete"}
                    label="Email"
                    placeholder="Email"
                    {...form.getInputProps("email")}
                />
                <TextInput
                    disabled={type === "delete"}
                    label="Phone Number"
                    placeholder="Phone Number"
                    {...form.getInputProps("phone")}
                />
            </Stack>
            <Divider my={30} />

            <Group>
                {type === "delete" ? (
                    <NumeroButton type="submit" label="Yes, Delete" onClick={handleDeleteTeacher} />
                ) : (
                    <NumeroButton
                        type="submit"
                        label={type === "add" ? "Add Teacher" : "Save Changes"}
                        disabled={Object.keys(form.errors).length > 0}
                        onClick={() => handleSubmit()}
                    />
                )}
                <NumeroButton type="button" label="Discard Changes" variant="subtle" onClick={() => closeAllModals()} />
            </Group>
        </form>
    );
}

export default TeacherForm;
