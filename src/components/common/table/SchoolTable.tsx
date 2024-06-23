// REACT IMPORTS

import { ActionIcon, createStyles, Group, Menu, Table } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconDirection, IconDotsVertical, IconEdit, IconEye } from "@tabler/icons";
import React, { ReactNode, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { School } from "../../../interfaces/School";
import { pageRoutes } from "../../general/routes/pageRoutes";
import SchoolModalContent from "../modal/SchoolModalContent";
import TableContent from "./Table";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    headers: string[];
    data: School[];
    footer?: string[];
}

interface DataType {
    [key: string]: string | number;
    name: string;
    street: string;
    state: string;
    copies: number;
}

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

const SchoolTable = ({ headers, data, footer }: Props) => {
    const [filteredData, setFilteredData] = React.useState<DataType[]>([]);
    const { classes } = useStyles();
    const navigate = useNavigate();

    const openSchoolModal = (id: number) => {
        console.log("🚀 TCL ~ file: SchoolTable.tsx:56 ~ openSchoolModal ~ props", id);
        openModal({
            // id: "school-modal",
            padding: 50,
            centered: true,
            size: "70%",
            children: <SchoolModalContent schoolId={id} />,
        });
    };

    const SchoolActionMenu = ({ id }: { id: number }) => (
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
                        if (!id) return;
                        openSchoolModal(id);
                    }}
                >
                    Edit School
                </Menu.Item>
                <Menu.Item
                    icon={<IconEye size={14} />}
                    onClick={() => {
                        navigate(pageRoutes.SCHOOL_DASHBOARD(id));
                    }}
                >
                    View School
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );

    useEffect(() => {
        setFilteredData(
            data.map((row, i) => {
                return {
                    id: row.id,
                    name: row.name,
                    street: row.street,
                    state: row.state,
                    copies: row.subscription,
                };
            })
        );
    }, [data]);

    return (
        <>
            <TableContent headers={headers} data={filteredData} actions={[SchoolActionMenu]} />
        </>
    );
};

export default SchoolTable;
