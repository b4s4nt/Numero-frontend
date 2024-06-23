// REACT IMPORTS
import { ActionIcon, createStyles, Group, Menu, Paper, Stack, Text, Title, Image } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons";
import { useContext, useEffect, useMemo } from "react";
import { Class } from "../../../interfaces/Class";
import NumeroButton from "../../common/button/Button";
import CollapsibleTable from "../../common/table/CollapsibleTable";
import NumeroTitle from "../../common/title/Title";
import ClassesImage from "../../../images/school/school-dashboard-classes.png";
import { useNavigate, useParams } from "react-router-dom";
import { handleClearClassData } from "../../common/modal/DeletionModalContent";
import { SchoolContext } from "../../../contexts/SchoolContext";
import { useMediaQuery } from "@mantine/hooks";
import { pageRoutes } from "../routes/pageRoutes";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {}

//

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

const ClassActionMenu = ({ id }: { id: string }) => {
    const { classes } = useStyles();
    const { schoolId } = useParams();
    const navigate = useNavigate();
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
                <Menu.Item
                    icon={<IconEdit size={14} />}
                    onClick={() => {
                        navigate(pageRoutes.SCHOOL_CLASSES_EDIT(schoolId, id));
                    }}
                >
                    Edit Class
                </Menu.Item>
                <Menu.Item
                    icon={<IconTrash size={14} />}
                    onClick={() => {
                        handleClearClassData(id);
                    }}
                >
                    Clear Data
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

const Classes = (props: Props) => {
    const navigate = useNavigate();
    const { schoolId, school, classes } = useContext(SchoolContext);

    const columns: string[] = ["Class", "Edit"];
    const collapsedHeader: string[] = ["firstName", "lastName", "studentId", "year", "room", "active"];
    const rows: Class[] = classes;

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <NumeroTitle title={"Classes"} />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    minHeight: "calc(100vh - 100px - 60px - 60px - 45px - 137px)",
                    padding: smallScreen ? "30px 8px" : mediumScreen ? "30px 30px" : "30px 90px",
                })}
            >
                <Group position={smallScreen ? "center" : "apart"} mb={largeScreen ? 80 : 40}>
                    <Group position="center" spacing={largeScreen ? 50 : 20}>
                        <Image
                            withPlaceholder
                            src={ClassesImage}
                            height={largeScreen ? 150 : 75}
                            width={largeScreen ? 150 : 75}
                        />
                        <Stack>
                            <Title order={4}>Classes</Title>
                            <Text>{school?.name}</Text>
                        </Stack>
                    </Group>
                    <NumeroButton
                        label={"Add Class"}
                        onClick={() => {
                            navigate(pageRoutes.SCHOOL_CLASSES_ADD(schoolId));
                        }}
                    />
                </Group>
                {classes.length === 0 ? (
                    <Text>No Classes Available</Text>
                ) : (
                    <CollapsibleTable
                        columns={columns}
                        rows={rows}
                        collapseContent={"students"}
                        collapsedHeader={collapsedHeader}
                        actions={[ClassActionMenu]}
                    />
                )}
            </Paper>
        </>
    );
};

export default Classes;
