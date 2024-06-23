// REACT IMPORTS
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../button/Button";
import SimpleModalContent from "../modal/SimpleModalContent";

// MANTINE IMPORTS
import {
    Stack,
    TextInput,
    Select,
    Checkbox,
    Anchor,
    Divider,
    Group,
    Text,
    createStyles,
    ActionIcon,
    Grid,
    LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openModal } from "@mantine/modals";
import { useToggle } from "@mantine/hooks";

// NETWORK IMPORTS
import AddStudent from "../../../networking/api/Student/AddStudent";
import DeleteStudent from "../../../networking/api/Student/DeleteStudent";
import EditStudent from "../../../networking/api/Student/EditStudent";

// TYPE IMPORTS

// FUNCTION IMPORTS
import { capFirstLetterOfEachWord, generatePassword } from "../../../helpers/helpers";
import { stubClassNames } from "../../../interfaces/Class";
import { Student } from "../../../interfaces/Student";
import { SchoolContext } from "../../../contexts/SchoolContext";

// STYLE IMPORTS
import { IconRotateClockwise } from "@tabler/icons";
import AddStudentImage from "../../../images/numero-add.png";
import ConfirmStudent from "../../../images/numero-confirm.png";
import ClearData from "../../../images/numero-delete.png";
import { objectPropertiesToUnderline } from "../../../helpers/convertPropertyName";
import { openSimpleModal } from "../modal/openModalFn";

interface Props {
    type: "add" | "edit" | "move" | "clear";
    studentId?: number;
}

interface NewStudent extends Student {
    password: string;
}

const useStyles = createStyles((theme) => ({
    input: {
        fontFamily: "'Roboto Mono', Monaco, Courier, monospace",
        fontWeight: 600,
        fontSize: "16px",
        letterSpacing: "1px",
    },
}));

const StudentForm = ({ type, studentId }: Props) => {
    const { classes } = useStyles();
    const { schoolId, students, classes: schoolClasses, fetchStudents } = useContext(SchoolContext);

    const [student, setStudent] = useState<null | Student>(null);
    const [loading, toggleLoading] = useToggle();

    const form = useForm({
        initialValues: {
            firstName: "",
            lastName: "",
            studentId: "",
            classId: 0,
            isActive: true,
            password: generatePassword(8),
        },
        validateInputOnChange: true,
        validateInputOnBlur: true,
        validate: {
            firstName: (value: string) => (value.trim().length > 0 ? null : "First name is required"),
            lastName: (value: string) => (value.trim().length > 0 ? null : "Last name is required"),
            studentId: (value: string) => (value.trim().length > 0 ? null : "Student ID is required"),
        },
        transformValues: (values) => {
            // capitalize first letter of first name and last name
            const firstName = capFirstLetterOfEachWord(values.firstName);
            const lastName = capFirstLetterOfEachWord(values.lastName);
            const isActive = values.isActive ? 1 : 0;
            return { ...values, firstName, lastName };
        },
    });

    async function fetchAddStudent(schoolId: string, student: Partial<NewStudent>) {
        toggleLoading();

        const req = new AddStudent(schoolId);
        req.input(objectPropertiesToUnderline({ ...student, school_id: schoolId }));

        const res = await req.fetch();

        if (res.success) {
            console.log("Add Student Success");
            toggleLoading();
            fetchStudents(schoolId);

            openSimpleModal({
                children: <SimpleModalContent title={`Student has been successfully added.`} img={AddStudentImage} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.error(res.error);
        }
    }

    async function fetchEditStudent(schoolId: string, studentId: number, student: Partial<Student>) {
        toggleLoading();

        const req = new EditStudent(schoolId, studentId);
        req.input(objectPropertiesToUnderline(student));
        const res = await req.fetch();

        if (res.success) {
            console.log("Edit Student Success");
            toggleLoading();
            fetchStudents(schoolId);

            openSimpleModal({
                children: <SimpleModalContent title={`Student has been successfully edited.`} img={ConfirmStudent} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.error(res.error);
        }
    }

    async function fetchDeleteStudent(schoolId: string, id: number) {
        toggleLoading();

        const req = new DeleteStudent(schoolId, id);
        const res = await req.fetch();

        if (res.success) {
            console.log("Delete Student Success");
            toggleLoading();
            fetchStudents(schoolId);

            openSimpleModal({
                children: <SimpleModalContent title={"Student data has been successfully cleared."} img={ClearData} />,
            });

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.error(res.error);
        }
    }

    const handleSubmit = form.onSubmit((values) => {
        console.log(`${type} student`, values);

        if (type === "add") {
            if (!schoolId) return;
            fetchAddStudent(schoolId, {
                ...values,
            });
        } else if (type === "edit" || type === "move") {
            if (!schoolId || !studentId) return;
            fetchEditStudent(schoolId, studentId, values);
        } else {
            console.error("something went wrong");
        }
    });

    const handleClear = () => {
        console.log("clear student data");
        if (!schoolId || !studentId) return;
        fetchDeleteStudent(schoolId, studentId);
    };

    useEffect(() => {
        if (!studentId || !students) return;
        // find student by id from SchoolContext
        setStudent(students.filter((student) => student.id === studentId)[0]);
    }, [studentId, students]);

    useEffect(() => {
        if (!student) return;

        form.setValues({
            firstName: student?.firstName || "",
            lastName: student?.lastName || "",
            studentId: student?.studentId || "",
            classId: student?.classId || 0,
            isActive: student?.active ? true : false,
        });
    }, [student]);

    const ControlButtons = ({ type }: { type: "add" | "edit" | "move" | "clear" }) => {
        switch (type) {
            case "add":
            case "edit":
                return (
                    <NumeroButton
                        type="submit"
                        label={type === "add" ? "Add Student" : "Save Changes"}
                        onClick={() => handleSubmit()}
                        disabled={Object.keys(form.errors).length > 0}
                        data-cy="submit"
                    />
                );

            case "move":
                return <NumeroButton type="button" label="Move Student" onClick={() => handleSubmit()} />;

            case "clear":
                return <NumeroButton type="button" label="Yes, Clear Data" onClick={handleClear} />;
            default:
                return null;
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack>
                <LoadingOverlay visible={loading} />
                <TextInput
                    label="First Name"
                    placeholder="First Name"
                    data-cy="firstName"
                    {...form.getInputProps("firstName")}
                    disabled={type === "move" || type === "clear"}
                />
                <TextInput
                    label="Last Name"
                    placeholder="Last Name"
                    data-cy="lastName"
                    {...form.getInputProps("lastName")}
                    disabled={type === "move" || type === "clear"}
                />
                <TextInput
                    label="Student ID"
                    placeholder="Student ID"
                    data-cy="studentId"
                    {...form.getInputProps("studentId")}
                    disabled={type === "move" || type === "clear"}
                />
                {type === "add" && (
                    <Grid align={"center"}>
                        <Grid.Col span={11}>
                            <TextInput
                                classNames={{
                                    input: classes.input,
                                }}
                                label="Password"
                                placeholder="Password"
                                {...form.getInputProps("password")}
                            />
                        </Grid.Col>
                        <Grid.Col span={1}>
                            <Stack
                                sx={(theme) => ({
                                    display: "flex",
                                    alignItems: "center",
                                    // width: "50px",
                                })}
                            >
                                <ActionIcon
                                    color={"red"}
                                    variant={"subtle"}
                                    onClick={() => {
                                        form.setFieldValue(`password`, generatePassword(8));
                                    }}
                                >
                                    <IconRotateClockwise />
                                </ActionIcon>
                            </Stack>
                        </Grid.Col>
                    </Grid>
                )}
                <Select
                    disabled={type === "clear"}
                    data={schoolClasses.map((schoolClass) => {
                        return {
                            label: schoolClass.name,
                            value: schoolClass.id,
                        };
                    })}
                    label="Class"
                    placeholder="Class"
                    data-cy="classId"
                    {...form.getInputProps("classId")}
                />

                {type === "move" ? (
                    <Text>
                        Class doesn't exist?{" "}
                        <Anchor color={"red"} ml={"md"} component={Link} to={`/school/${schoolId}/classes/add`}>
                            Create Class
                        </Anchor>
                    </Text>
                ) : type === "clear" ? null : (
                    <Checkbox label="Activate Student" {...form.getInputProps("isActive", { type: "checkbox" })} />
                )}
            </Stack>

            <Divider my={30} />

            <Group>
                <ControlButtons type={type} />
                <NumeroButton type="button" label="Discard Changes" variant="subtle" onClick={() => closeAllModals()} />
            </Group>
        </form>
    );
};

export default StudentForm;
