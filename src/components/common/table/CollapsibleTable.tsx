import { createStyles, Skeleton, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronRight, IconChevronDown } from "@tabler/icons";
import React, { useContext, useEffect, useState } from "react";
import { SchoolContext } from "../../../contexts/SchoolContext";
import { camelToSpace } from "../../../helpers/convertPropertyName";
import { revertCamelCase } from "../../../helpers/helpers";
import { Class } from "../../../interfaces/Class";
import { Student } from "../../../interfaces/Student";
import { LoadingContext } from "../../general/loading/context/context";
import ActiveBadge from "../badge/ActiveBadge";

interface TableProps {
    columns: string[];
    rows: Class[];
    collapseContent: string;
    collapsedHeader: string[];
    actions?: React.ElementType[];
}

interface RowProps {
    columns: string[];
    row: Class;
    collapseContent: string;
    open: boolean;
    setOpen: (index: number | null) => void;
    hasOpen: boolean;
    index: number;
    actions?: React.ElementType[];
}

const useStyles = createStyles((theme) => ({
    control: {
        color: theme.white,
    },
    icon: {},
    header: {
        "th:first-of-type": {
            borderRadius: `${theme.radius.md}px 0 0 0`,
            width: "20px",
        },
        "th:last-of-type": {
            borderRadius: `0 ${theme.radius.md}px 0 0`,
            width: "20px",
        },
        [theme.fn.smallerThan("md")]: {
            th: {
                padding: `${theme.spacing.xs}px !important`,
            },
        },
    },
    th: {
        backgroundColor: theme.colors.red[3],

        fontWeight: 500,
        position: "sticky",
        top: 0,
        zIndex: 1,
    },
    td: {
        cursor: "pointer",
    },
    root: {
        fontSize: "16px",
    },
}));

const CollapsibleRow = ({ columns, row, collapseContent, open, setOpen, hasOpen, index, actions }: RowProps) => {
    const { classes } = useStyles();
    const identify = row.id || row.name;
    const { students } = useContext(SchoolContext);
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const [classStudents, setClassStudents] = useState<Student[]>([]);

    const toggleRow = () => {
        if (smallScreen) return;

        const classId = row.id;
        setClassStudents(students.filter((student) => student.classId === classId));

        // if (!row.students) {
        //     // filter student
        //     return;
        // }

        setOpen(open ? null : index);
    };

    useEffect(() => {
        console.log("🚀 TCL ~ file: CollapsibleTable.tsx:74 ~ CollapsibleRow ~ classStudents", classStudents);
    }, [classStudents]);

    useEffect(() => {
        function resizeWindow() {
            setOpen(null);
        }
        window.addEventListener("resize", resizeWindow);
        return () => {
            window.removeEventListener("resize", resizeWindow);
        };
    }, []);

    return (
        <>
            <tr>
                <td className={classes.td} onClick={toggleRow}>
                    {open ? <IconChevronDown /> : <IconChevronRight />}
                </td>

                <td
                    className={classes.td}
                    // width="250px"
                    onClick={toggleRow}
                    colSpan={hasOpen ? 7 : 1}
                >
                    {`Math ${row.name} `}
                    {row.teacher?.lastName && `Mr./Ms. ${row.teacher?.lastName}`}
                </td>

                <td>
                    {actions &&
                        actions?.length > 0 &&
                        actions.map((Action, i) => {
                            return <Action key={`action-${i}`} id={identify} />;
                        })}
                </td>
            </tr>

            {open &&
                !smallScreen &&
                classStudents.map((student: Partial<Student>, index) => (
                    <tr key={`student-${index}`}>
                        <td></td>
                        <td></td>
                        {columns.map((column, i) => {
                            const value = student[column];

                            if (typeof value === "boolean") {
                                return (
                                    <td key={`column-${i}`}>
                                        <ActiveBadge active={value ? true : false} />
                                    </td>
                                );
                            } else {
                                return (
                                    <td key={`column-${i}`}>
                                        <Text>{value ?? ""}</Text>
                                    </td>
                                );
                            }
                        })}
                        <td></td>
                    </tr>
                ))}
        </>
    );
};

const SkeletonRow = ({ rowNum, visible }: { rowNum: number; visible: boolean }) => {
    return (
        <>
            {Array.from({ length: rowNum }, (_, i) => i).map((row) => (
                <tr key={`skeleton-row-${row}`}>
                    <td>
                        <Skeleton visible={visible} height={30} />
                    </td>
                    <td>
                        <Skeleton visible={visible} height={30} />
                    </td>
                    <td>
                        <Skeleton visible={visible} height={30} />
                    </td>
                </tr>
            ))}
        </>
    );
};

const CollapsibleTable = ({ columns, rows, collapseContent, collapsedHeader, actions }: TableProps) => {
    const { classes } = useStyles();
    const [collapsed, setCollapsed] = useState<{ [key: string]: boolean }>({});
    const [open, setOpen] = useState<number | null>(null);

    const { loading, setLoading } = useContext(LoadingContext);
    const smallScreen = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <Table striped highlightOnHover verticalSpacing={"md"} horizontalSpacing={"md"} className={classes.root}>
            <thead className={classes.header}>
                <tr>
                    <th className={classes.th}></th>
                    {open !== null ? (
                        <>
                            {<th className={classes.th}>{columns[0]}</th>}
                            {!smallScreen &&
                                collapsedHeader.map((column) => (
                                    <th className={classes.th} key={column}>
                                        <Text transform="capitalize">{camelToSpace(column)}</Text>
                                    </th>
                                ))}
                            {<th className={classes.th}>{columns[1]}</th>}
                        </>
                    ) : (
                        columns.map((column) => (
                            <th className={classes.th} key={column}>
                                <Text transform="capitalize">{camelToSpace(column)}</Text>
                            </th>
                        ))
                    )}
                </tr>
            </thead>
            <tbody>
                {loading && <SkeletonRow rowNum={5} visible={loading} />}
                {!loading &&
                    rows.map((row, index) => (
                        <React.Fragment key={index}>
                            <CollapsibleRow
                                columns={collapsedHeader}
                                row={row}
                                collapseContent={collapseContent}
                                open={open === index}
                                setOpen={setOpen}
                                hasOpen={open !== null}
                                index={index}
                                actions={actions}
                            />
                        </React.Fragment>
                    ))}
            </tbody>
        </Table>
    );
};
export default CollapsibleTable;
