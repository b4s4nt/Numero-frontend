// REACT IMPORTS

import {
    ActionIcon,
    Button,
    Divider,
    Group,
    Paper,
    Select,
    SimpleGrid,
    Stack,
    Switch,
    TextInput,
    Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconRotateClockwise, IconTrash, IconX } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SchoolContext } from "../../../../contexts/SchoolContext";
import { Class } from "../../../../interfaces/Class";
import { stubTeachers, Teacher } from "../../../../interfaces/Teacher";
import EditClass from "../../../../networking/api/Class/EditClass";
import NumeroButton from "../../../common/button/Button";
import { handleClearStudentData } from "../../../common/modal/DeletionModalContent";
import NumeroTitle from "../../../common/title/Title";
import { pageRoutes } from "../../routes/pageRoutes";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {}

const ClassDetail = (props: Props) => {
    const { name } = useParams();
    const { schoolId, teachers, classes, students, fetchClasses } = useContext(SchoolContext);
    const navigate = useNavigate();
    const [currentClass, setCurrentClass] = useState<Class>({} as Class);
    // const [teachers, setTeachers] = useState<Teacher[]>([]);

    const form = useForm({
        initialValues: {
            name: "",
            teacher: 0,
            students: [
                {
                    firstName: "",
                    lastName: "",
                    studentId: "",
                    active: true,
                    className: "",
                },
            ],
        },
        transformValues: (values) => {
            values.students = values.students.map((student) => ({
                ...student,
                className: values.name,
            }));

            return values;
        },
    });

    const fetchEditClass = async (values: { name: string }) => {
        if (!schoolId) return;

        console.log("🚀 TCL ~ file: ClassDetail.tsx:81 ~ fetchEditClass ~ schoolId", schoolId);
        console.log("🚀 TCL ~ file: ClassDetail.tsx:82 ~ fetchEditClass ~ currentClass.id", currentClass.id);
        const req = new EditClass(schoolId, currentClass.id);
        req.input({
            name: values.name,
        });
        const res = await req.fetch();
        console.log("🚀 TCL ~ file: ClassDetail.tsx:85 ~ fetchEditClass ~ res", res);

        if (res.success) {
            fetchClasses(schoolId);
        } else {
            console.log("Error", res.error);
        }
    };

    const handleSubmit = form.onSubmit((values) => {
        // ! EDIT class details
        fetchEditClass({ name: values.name });
        // ! Edit students

        // console.log("Edit class", values.name);
        // console.log("teacher", values.teacher);
        // console.table(values.students);
        // TODO: Sent data to backend to Edit class
    });

    useEffect(() => {
        // TODO: Fetch class data
        if (!name || !classes) return;

        const c = classes.filter((c) => c.id === parseInt(name))[0];
        c.students = students.filter((student) => student.className === c.name);

        console.log("🚀 TCL ~ file: ClassDetail.tsx:116 ~ useEffect ~ c", c);
        if (c) setCurrentClass(c);
    }, [classes]);

    useEffect(() => {
        console.log("🚀 TCL ~ file: ClassDetail.tsx:96 ~ useEffect ~ currentClass", currentClass);

        if (Object.keys(currentClass).length === 0) return;
        if (currentClass.students) {
            form.setValues({
                students: students.map((student) => ({
                    firstName: student.firstName,
                    lastName: student.lastName,
                    studentId: student.studentId,
                    active: student.active ? true : false,
                    className: student.className,
                })),
            });
        }
        if (currentClass.teacher) {
            form.setValues({
                teacher: currentClass.teacher.id,
            });
        }

        form.setValues({
            name: currentClass.name,
        });
    }, [currentClass]);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <NumeroTitle title={"EDIT CLASS"} />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    height: "100%",
                    padding: "30px 90px",
                })}
            >
                <Title order={4}>Class Name: {form.values.name}</Title>

                <form onSubmit={handleSubmit}>
                    <Stack align={"flex-start"}>
                        <TextInput
                            label="Class Name"
                            placeholder="Class Name"
                            required
                            {...form.getInputProps("name")}
                        />

                        <Select
                            label="Teacher"
                            placeholder="Select teacher"
                            required
                            {...form.getInputProps("teacher")}
                            data={teachers.map((teacher) => ({
                                label: `${teacher.firstName} ${teacher.lastName}`,
                                value: teacher.id,
                            }))}
                        />

                        {form.values.students.length > 0 &&
                            form.values.students.map((student, index) => {
                                return (
                                    <Group
                                        // cols={5}
                                        w={"100%"}
                                        key={`${name}-row-${index}`}
                                        noWrap={!mediumScreen}
                                    >
                                        <TextInput
                                            label="First name"
                                            placeholder="first name"
                                            {...form.getInputProps(`students.${index}.firstName`)}
                                        />
                                        <TextInput
                                            label="Last name"
                                            placeholder="Last name"
                                            {...form.getInputProps(`students.${index}.lastName`)}
                                        />
                                        <TextInput
                                            label="Student ID"
                                            placeholder="Student ID"
                                            {...form.getInputProps(`students.${index}.studentId`)}
                                        />
                                        <Switch
                                            // label="Active"
                                            thumbIcon={
                                                form.values.students[index].active ? (
                                                    <IconCheck size={12} color={"green"} stroke={3} />
                                                ) : (
                                                    <IconX size={12} color={"red"} stroke={3} />
                                                )
                                            }
                                            {...form.getInputProps(`students.${index}.active`, { type: "checkbox" })}
                                        />
                                        <Button.Group>
                                            <Button
                                                size="sm"
                                                leftIcon={<IconTrash size={16} />}
                                                color={"red"}
                                                variant={"subtle"}
                                                onClick={() => {
                                                    handleClearStudentData(parseInt(student.studentId));
                                                    // form.removeListItem("students", index);
                                                    // refetch students
                                                }}
                                            >
                                                Clear Data
                                            </Button>
                                            <Button
                                                size="sm"
                                                leftIcon={<IconRotateClockwise size={16} />}
                                                color={"red"}
                                                variant={"subtle"}
                                                onClick={() => {
                                                    // handleClearStudentData(student.studentId);
                                                    // form.removeListItem("students", index);
                                                    // refetch students
                                                }}
                                            >
                                                Reset Password
                                            </Button>
                                        </Button.Group>
                                    </Group>
                                );
                            })}
                        <Divider my={30} />

                        <Group>
                            {/* <ControlButtons type={type} /> */}
                            <NumeroButton
                                type="submit"
                                label="Save Changes"
                                variant="filled"
                                onClick={() => handleSubmit()}
                            />
                            <NumeroButton
                                type="button"
                                label="Discard Changes"
                                variant="subtle"
                                onClick={() => {
                                    navigate(pageRoutes.SCHOOL_CLASSES(schoolId));
                                }}
                            />
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default ClassDetail;
