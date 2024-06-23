// REACT IMPORTS

import { ActionIcon, createStyles, Menu, Title } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons";
import { useContext } from "react";
import { SchoolContext } from "../../../contexts/SchoolContext";
import { LoadingContext } from "../../general/loading/context/context";
import { handleDeleteTeacher } from "../modal/DeletionModalContent";
import TeacherModalContent from "../modal/TeacherModalContent";
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

const TeacherTable = (props: Props) => {
    const headers = ["Last Name", "First Name", "Email", "Phone", "Actions"];
    const { classes } = useStyles();

    const { schoolId, teachers } = useContext(SchoolContext);

    const handleEditTeacher = (id: number) => {
        if (!schoolId) return;

        openModal({
            title: (
                <Title order={4} transform="capitalize">
                    Edit Teacher
                </Title>
            ),
            children: <TeacherModalContent type={"edit"} teacherId={id} />,
        });
    };

    const TeacherActionMenu = ({ id }: { id: number }) => (
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
                <Menu.Item
                    icon={<IconEdit size={14} />}
                    onClick={() => {
                        if (!schoolId) return;
                        handleEditTeacher(id);
                    }}
                >
                    Edit Teacher
                </Menu.Item>
                <Menu.Item
                    icon={<IconTrash size={14} />}
                    onClick={() => {
                        if (!schoolId) return;
                        handleDeleteTeacher(id);
                    }}
                >
                    Delete Teacher
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );

    return (
        <>
            <TableContent headers={headers} data={teachers} actions={[TeacherActionMenu]} />
        </>
    );
};

export default TeacherTable;
