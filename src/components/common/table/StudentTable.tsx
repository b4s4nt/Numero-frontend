// REACT IMPORTS

import { Table, ActionIcon, createStyles, Menu, Title, Skeleton } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconArrowRight, IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SchoolContext } from "../../../contexts/SchoolContext";
import { Student } from "../../../interfaces/Student";
import ListStudents from "../../../networking/api/Student/ListStudent";
import { LoadingContext } from "../../general/loading/context/context";
import DeletionModalContent, { handleClearStudentData } from "../modal/DeletionModalContent";
import StudentContent from "../modal/StudentModalContent";
import TableContent from "./Table";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS
// STYLE IMPORTS

interface Props {}
const useStyles = createStyles((theme) => ({
    menuItem: {
        "&:hover": {
            backgroundColor: theme.fn.lighten(theme.colors.red[0], 0.75),
            color: theme.colors.red[3],
        },
    },
    dropdown: {
        padding: 0,
    },
}));

const StudentTable = (props: Props) => {
    const headers = ["Last Name", "First Name", "Student ID", "Class Name", "Active", "Actions"];
    const { classes } = useStyles();

    const { schoolId, students, classes: schoolClasses } = useContext(SchoolContext);

    const handleEditStudent = (id: number) => {
        openModal({
            title: (
                <Title order={4} transform="capitalize">
                    Edit Student
                </Title>
            ),
            children: <StudentContent type={"edit"} studentId={id} />,
        });
    };
    const handleMoveStudent = (id: number) => {
        openModal({
            title: (
                <Title order={4} transform="capitalize">
                    Move Student
                </Title>
            ),
            children: <StudentContent type={"move"} studentId={id} />,
        });
    };

    const StudentActionMenu = ({ id }: { id: number }) => {
        return (
            <Menu
                shadow="xl"
                radius={"md"}
                width={160}
                position={"bottom-end"}
                classNames={{
                    dropdown: classes.dropdown,
                    item: classes.menuItem,
                }}
            >
                <Menu.Target>
                    <ActionIcon color={"red"} variant={"transparent"}>
                        <IconDotsVertical />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item icon={<IconEdit size={14} />} onClick={() => handleEditStudent(id)}>
                        Edit Student
                    </Menu.Item>
                    <Menu.Item icon={<IconArrowRight size={14} />} onClick={() => handleMoveStudent(id)}>
                        Move Student
                    </Menu.Item>
                    <Menu.Item
                        icon={<IconTrash size={14} />}
                        onClick={() => {
                            handleClearStudentData(id);
                        }}
                    >
                        Clear Data
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        );
    };

    const formattedStudents = students.map((student: Student) => ({
        ...student,
        classId: schoolClasses.find((c) => c.id === student.classId)?.name,
    }));

    return (
        <>
            <TableContent headers={headers} data={formattedStudents} actions={[StudentActionMenu]} />
        </>
    );
};

export default StudentTable;
