// REACT IMPORTS

import {
    Stepper,
    Group,
    Button,
    Paper,
    Divider,
    createStyles,
    Title,
    TextInput,
    NumberInput,
    Stack,
    Text,
    ActionIcon,
    Anchor,
    Box,
    SimpleGrid,
    PasswordInput,
    Grid,
    Table,
    Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openModal } from "@mantine/modals";
import { Action } from "@remix-run/router";
import { IconArrowBackUp, IconRotateClockwise, IconTrash } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { SchoolContext } from "../../../../contexts/SchoolContext";
import { allFieldsHaveValues, generatePassword } from "../../../../helpers/helpers";
import { Class } from "../../../../interfaces/Class";
import { stubTeachers, Teacher } from "../../../../interfaces/Teacher";
import AddClass from "../../../../networking/api/Class/AddClass";
import AddStudent from "../../../../networking/api/Student/AddStudent";
import NumeroButton from "../../../common/button/Button";
import SimpleModalContent from "../../../common/modal/SimpleModalContent";
import NumeroTitle from "../../../common/title/Title";
import { pageRoutes } from "../../routes/pageRoutes";
import PrintStudentTable from "./PrintStudentTable";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import ConfirmSchool from "../../../../images/numero-confirm.png";
import { openSimpleModal } from "../../../common/modal/openModalFn";

interface Props {}

const useStyles = createStyles((theme) => ({
    stepLabel: {
        fontSize: "14px",
        width: "120px",
    },
    input: {
        fontFamily: "'Roboto Mono', Monaco, Courier, monospace",
        fontWeight: 600,
        fontSize: "16px",
        letterSpacing: "1px",
    },
}));

const NewClass = (props: Props) => {
    const { classes } = useStyles();
    const { schoolId, teachers, fetchClasses } = useContext(SchoolContext);

    const [active, setActive] = useState(0);
    const [studentNo, setStudentNo] = useState(5);
    const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const navigate = useNavigate();

    const fetchAddClass = async (
        school_id: string,
        value: {
            name: string;
        }
    ) => {
        const req = new AddClass(school_id);
        req.input({
            name: value.name,
            floor: 2,
            year: 2,
            school_id: school_id,
        });
        const res = await req.fetch();

        if (res.success) {
            return { success: true, data: res.data };
        } else {
            console.log(res.error);
        }
    };

    const handleAddClass = async () => {
        if (!schoolId) return;

        const result = await fetchAddClass(schoolId, {
            name: form.values.name,
        });
        console.log("🚀 TCL ~ file: NewClass.tsx:111 ~ handleAddClass ~ result", result);

        if (result?.success && form.values.studentNumber === 0) {
            openSimpleModal({
                children: <SimpleModalContent title={`Class has been successfully added.`} img={ConfirmSchool} />,
            });

            fetchClasses(schoolId);

            setTimeout(() => {
                closeAllModals();
                navigate(pageRoutes.SCHOOL_CLASSES(schoolId));
            }, 2000);
        } else {
            // nextStep();
        }
    };

    const fetchAddStudent = async (schoolId: string, classId: string, value: any) => {
        const req = new AddStudent(schoolId);
        req.input({
            class_id: classId,
            ...value,
        });
        const res = await req.fetch();

        if (res.success) {
            return { success: true, data: res.data };
        } else {
            console.log(res.error);
        }
    };

    const handleAddStudentNumber = () => {
        form.setValues({
            ...form.values,
            studentNumber: form.values.studentNumber + 1,
        });
        form.insertListItem("students", {
            firstName: "",
            lastName: "",
            studentId: "",
            password: generatePassword(8),
        });
    };

    const handleAddClassAndStudents = async () => {
        if (!schoolId) return;

        // ! Add class and get the class id
        const addClassRes = await fetchAddClass(schoolId, {
            name: form.values.name,
        });

        // ! Add students with the class id one by one
        if (addClassRes?.success) {
            const fetches = form.values.students.map((student) => {
                return fetchAddStudent(schoolId, addClassRes.data.id, {
                    first_name: student.firstName,
                    last_name: student.lastName,
                    student_id: student.studentId,
                    password: student.password,
                });
            });

            const addStudentRes = await Promise.all(fetches);
            console.log("🚀 TCL ~ file: NewClass.tsx:178 ~ handleAddClassAndStudents ~ addStudentRes", addStudentRes);
            if (addStudentRes.every((res) => res?.success)) {
                // openSimpleModal({
                //     children: (
                //         <SimpleModalContent
                //             title={`Class and Students has been successfully added.`}
                //             img={ConfirmSchool}
                //         />
                //     ),
                // });

                // fetchClasses(schoolId);

                // setTimeout(() => {
                //     closeAllModals();
                //     navigate(pageRoutes.SCHOOL_CLASSES(schoolId));
                // }, 2000);
                nextStep();
            } else {
                console.error("Error adding students");
            }
        }
    };

    const form = useForm({
        initialValues: {
            name: "",
            studentNumber: 0,
            teacher: "",
            students: [
                {
                    firstName: "",
                    lastName: "",
                    studentId: "",
                    password: generatePassword(8),
                },
            ],
        },
    });

    const handleFirstStep = () => {
        if (form.values.studentNumber < 1) {
            handleAddClass();
        } else {
            let length = form.values.students.length;

            while (length < form.values.studentNumber) {
                form.insertListItem("students", {
                    firstName: "",
                    lastName: "",
                    studentId: "",
                    password: generatePassword(8),
                });
                length++;
            }

            nextStep();
        }
    };

    const studentFields = form.values.students.map((item, index) => {
        return (
            <Group key={`studentFields-${index}`} noWrap>
                <SimpleGrid cols={3} w={"100%"}>
                    <TextInput
                        disabled={active > 1}
                        label="First name"
                        placeholder="first name"
                        required
                        {...form.getInputProps(`students.${index}.firstName`)}
                    />
                    <TextInput
                        disabled={active > 1}
                        label="Last name"
                        placeholder="Last name"
                        required
                        {...form.getInputProps(`students.${index}.lastName`)}
                    />
                    <TextInput
                        disabled={active > 1}
                        label="Student ID"
                        placeholder="Student ID"
                        required
                        {...form.getInputProps(`students.${index}.studentId`)}
                    />
                </SimpleGrid>
                <ActionIcon
                    disabled={active > 1 || form.values.students.length === 1}
                    color={"red"}
                    variant={"subtle"}
                    onClick={() => {
                        form.removeListItem("students", index);
                    }}
                >
                    <IconTrash />
                </ActionIcon>
            </Group>
        );
    });

    const studentPasswordFields = form.values.students.map((item, index) => {
        return (
            <Group key={`studentPasswordFields-${index}`} noWrap>
                <TextInput
                    disabled={active !== 2}
                    label="Password"
                    placeholder="Password"
                    required
                    classNames={{
                        input: classes.input,
                    }}
                    {...form.getInputProps(`students.${index}.password`)}
                />
                <Box
                    sx={(theme) => ({
                        width: "50px",
                    })}
                >
                    <ActionIcon
                        disabled={active !== 2}
                        color={"red"}
                        variant={"subtle"}
                        onClick={() => {
                            form.setFieldValue(`students.${index}.password`, generatePassword(8));
                        }}
                    >
                        <IconRotateClockwise />
                    </ActionIcon>
                </Box>
            </Group>
        );
    });

    useEffect(() => {
        if (active === 4) {
            // settimeout direct to class list
            setTimeout(() => {
                navigate(pageRoutes.SCHOOL_CLASSES(schoolId));
            }, 2000);
        }
    }, [active]);

    return (
        <>
            <NumeroTitle title={"ADD A CLASS"} />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    height: "100%",
                    padding: "30px 90px",
                })}
            >
                <form>
                    <Stepper
                        active={active}
                        breakpoint="sm"
                        classNames={{
                            stepLabel: classes.stepLabel,
                        }}
                    >
                        {/* STEP 1 ------------------------------------------------------------------------------------------*/}
                        <Stepper.Step label="New class and number of students">
                            <Divider my={30} />

                            <Stack w={"50%"}>
                                <Title order={4} transform="capitalize">
                                    Create a new class
                                </Title>
                                <TextInput
                                    label="Class name"
                                    placeholder="Enter class name"
                                    required
                                    {...form.getInputProps("name")}
                                />
                                <NumberInput
                                    min={0}
                                    label="Number of students"
                                    placeholder="Enter number of students"
                                    required
                                    {...form.getInputProps("studentNumber")}
                                />

                                <Divider my={20} />

                                <Text>Follow the steps to create new classes and student accounts.</Text>
                                <Text>
                                    You can use generated passwords by checking the box above or create them manually in
                                    the next step.
                                </Text>
                                <Text weight={"bold"}>You can assign Students to class later.</Text>
                            </Stack>

                            <Divider my={30} />

                            {/* Step Control */}
                            <Stack align={"center"}>
                                <Group position="center" mt="xl">
                                    <Button disabled variant="default" onClick={prevStep}>
                                        Back
                                    </Button>

                                    <Button disabled={form.values.name === ""} onClick={handleFirstStep}>
                                        {form.values.studentNumber > 0 ? "Next step" : "Create class"}
                                    </Button>
                                </Group>
                                {form.values.studentNumber === 0 && (
                                    <Text size={10} color="red">
                                        This will only create the class
                                    </Text>
                                )}
                            </Stack>
                        </Stepper.Step>

                        {/* STEP 2 ------------------------------------------------------------------------------------------*/}
                        <Stepper.Step label="Enter student details">
                            <Divider my={30} />
                            <Stack align={"left"} w={"100%"}>
                                <Stack spacing={0} pb={30}>
                                    <Stack align={"left"} w={"100%"}>
                                        <Grid align={"flex-end"}>
                                            {/* Student Detail */}
                                            <Grid.Col span={9}>
                                                <Stack spacing={0}>
                                                    <Text>Class: {form.values.name}</Text>
                                                    <Title order={4} transform="capitalize">
                                                        Enter students details
                                                    </Title>
                                                </Stack>
                                                <Stack spacing={0}>
                                                    <Stack spacing={0} pb={30}>
                                                        {studentFields}
                                                    </Stack>
                                                </Stack>
                                            </Grid.Col>
                                            {/* Student Password */}
                                            <Grid.Col span={3}>
                                                <Box
                                                    sx={(theme) => ({
                                                        padding: "30px",
                                                        border: "1px solid #E7E3E3",
                                                        opacity: active === 1 ? 0 : 1,
                                                    })}
                                                >
                                                    <Text mb={20}>Finalise Passwords</Text>
                                                    <Stack spacing={0}>{studentPasswordFields}</Stack>
                                                </Box>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>

                                    <Group>
                                        <Anchor
                                            disabled={active === 2}
                                            color={active === 1 ? "red" : "gray"}
                                            sx={(theme) => ({
                                                cursor: active === 1 ? "pointer" : "not-allowed",
                                            })}
                                            align="left"
                                            component="button"
                                            onClick={handleAddStudentNumber}
                                        >
                                            + Add Student
                                        </Anchor>
                                    </Group>
                                </Stack>
                            </Stack>

                            <Divider my={30} />

                            {/* Step Control */}
                            <Group position="center" mt="xl">
                                <Button variant="default" onClick={prevStep} disabled>
                                    Back
                                </Button>
                                <Button
                                    disabled={!allFieldsHaveValues(form.values.students)}
                                    onClick={() => {
                                        nextStep();
                                    }}
                                >
                                    Next step
                                </Button>
                            </Group>
                        </Stepper.Step>

                        {/* STEP 3 ------------------------------------------------------------------------------------------*/}
                        <Stepper.Step label="Student passwords">
                            <Divider my={30} />
                            <Stack align={"left"} w={"100%"}>
                                {/* <Stack spacing={0}>
                                    <Text>Class: {form.values.name}</Text>
                                    <Title order={4} transform="capitalize">
                                        Finalise student passwords
                                    </Title>
                                </Stack>
                                <StudentDetails step={3} /> */}

                                {/* ----------------------------------------------------------------------------- */}

                                <Stack spacing={0} pb={30}>
                                    <Stack align={"left"} w={"100%"}>
                                        <Grid align={"flex-end"}>
                                            {/* Student Detail */}
                                            <Grid.Col span={9}>
                                                <Stack spacing={0}>
                                                    <Text>Class: {form.values.name}</Text>
                                                    <Title order={4} transform="capitalize">
                                                        Finalise student passwords
                                                    </Title>
                                                </Stack>
                                                <Stack spacing={0}>
                                                    <Stack spacing={0} pb={30}>
                                                        {studentFields}
                                                    </Stack>
                                                </Stack>
                                            </Grid.Col>
                                            {/* Student Password */}
                                            <Grid.Col span={3}>
                                                <Box
                                                    sx={(theme) => ({
                                                        padding: "30px",
                                                        border: "1px solid #E7E3E3",
                                                        opacity: active === 1 ? 0 : 1,
                                                    })}
                                                >
                                                    <Text mb={20}>Finalise Passwords</Text>
                                                    <Stack spacing={0}>{studentPasswordFields}</Stack>
                                                </Box>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>

                                    <Group>
                                        <Anchor
                                            disabled={active === 2}
                                            color={active === 1 ? "red" : "gray"}
                                            sx={(theme) => ({
                                                cursor: active === 1 ? "pointer" : "not-allowed",
                                            })}
                                            align="left"
                                            component="button"
                                            onClick={handleAddStudentNumber}
                                        >
                                            + Add Student
                                        </Anchor>
                                    </Group>
                                </Stack>
                            </Stack>

                            <Divider my={30} />

                            {/* Step Control */}
                            <Group position="center" mt="xl">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    // disabled
                                    onClick={() => {
                                        nextStep();
                                    }}
                                >
                                    Next step
                                </Button>
                            </Group>
                        </Stepper.Step>

                        {/* STEP 4 ------------------------------------------------------------------------------------------*/}
                        <Stepper.Step label="Overview, print and save">
                            <Divider my={30} />
                            <Stack align={"left"} w={"100%"}>
                                {/* Students details */}
                                <Stack spacing={0} pb={30}>
                                    <Stack align={"left"} w={"100%"}>
                                        <Grid align={"flex-end"}>
                                            {/* Student Detail */}
                                            <Grid.Col span={9}>
                                                <Stack spacing={0}>
                                                    <Text>Class: {form.values.name}</Text>
                                                    <Title order={4} transform="capitalize">
                                                        Review and print
                                                    </Title>
                                                </Stack>
                                                <Stack spacing={0}>
                                                    <Stack spacing={0} pb={30}>
                                                        {studentFields}
                                                    </Stack>
                                                </Stack>
                                            </Grid.Col>
                                            {/* Student Password */}
                                            <Grid.Col span={3}>
                                                <Box
                                                    sx={(theme) => ({
                                                        padding: "30px",
                                                        border: "1px solid #E7E3E3",
                                                        opacity: 1,
                                                    })}
                                                >
                                                    <Text mb={20}>Finalise Passwords</Text>
                                                    <Stack spacing={0}>{studentPasswordFields}</Stack>
                                                </Box>
                                            </Grid.Col>
                                        </Grid>
                                    </Stack>

                                    <Group>
                                        <Anchor
                                            disabled={active !== 1}
                                            color={active === 1 ? "red" : "gray"}
                                            sx={(theme) => ({
                                                cursor: active === 1 ? "pointer" : "not-allowed",
                                            })}
                                            align="left"
                                            component="button"
                                            onClick={handleAddStudentNumber}
                                        >
                                            + Add Student
                                        </Anchor>
                                    </Group>
                                </Stack>

                                {/* Printing Component */}
                                <PrintStudentTable name={form.values.name} students={form.values.students} />
                            </Stack>

                            <Divider my={30} />

                            {/* Step Control */}
                            <Group position="center" mt="xl">
                                <Button variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    onClick={() => {
                                        console.table(form.values);
                                        // sent all the data to the server
                                        handleAddClassAndStudents();
                                        // nextStep();
                                    }}
                                >
                                    Submit
                                </Button>
                            </Group>
                        </Stepper.Step>

                        {/* COMPLETION ------------------------------------------------------------------------------------------*/}
                        <Stepper.Completed>
                            <Divider my={30} />
                            Completed. Return to class list in 5 seconds.
                            {/* Step Control */}
                            <Group position="center" mt="xl">
                                <Button disabled variant="default" onClick={prevStep}>
                                    Back
                                </Button>
                                <Button
                                    // disabled
                                    onClick={() => {
                                        navigate(pageRoutes.SCHOOL_CLASSES(schoolId));
                                    }}
                                >
                                    Return to Class List
                                </Button>
                            </Group>
                        </Stepper.Completed>
                    </Stepper>
                </form>
            </Paper>
        </>
    );
};

export default NewClass;
