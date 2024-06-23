// REACT IMPORTS

import { Box, createStyles, Divider, Group, Stack, Table, Title, Image } from "@mantine/core";
import React, { Component, useRef } from "react";
import { Student } from "../../../../interfaces/Student";
import NumeroButton from "../../../common/button/Button";
import withPrint from "react-to-print";
import ReactToPrint from "react-to-print";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import Logo from "../../../../images/numero-logo.png";

interface NewStudent extends Student {
    password: string;
}

interface Props {
    name: string;
    students: Partial<NewStudent>[];
}

interface TableProps {
    students: Partial<NewStudent>[];
    forwardRef?: React.RefObject<any>;
}

const useStyles = createStyles((theme) => ({
    table: {
        // marginBottom: "20px",

        thead: {
            tr: {
                th: {
                    fontSize: "18px",
                },
            },
        },
        tbody: {
            tr: {
                td: {
                    fontSize: "16px",
                    "&:last-child": {
                        fontFamily: "'Roboto Mono', Monaco, monospace",
                        fontWeight: 600,
                        fontSize: "18px",
                        letterSpacing: "1px",
                    },
                },
            },
        },
    },
}));

const StudentTable = ({ students, forwardRef }: TableProps) => {
    const { classes } = useStyles();
    return (
        <Box ref={forwardRef}>
            <Divider size="md" my="md" variant="dashed" />
            {students.map((student, index) => {
                return (
                    <React.Fragment key={`student-detail-${index}`}>
                        <Table className={classes.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    {/* <th>Last Name</th> */}
                                    <th>Student ID</th>
                                    <th>Password</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        {student.firstName} {student.lastName}
                                    </td>
                                    {/* <td>{student.lastName}</td> */}
                                    <td>{student.studentId}</td>
                                    <td>{student.password}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Divider size="md" my="md" variant="dashed" />
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

function PrintStudentTable({ students, name }: Props) {
    const { classes } = useStyles();
    const printRef = useRef(null);

    return (
        <>
            <Box
                sx={(theme) => ({
                    display: "none",
                })}
            >
                <Stack
                    ref={printRef}
                    sx={(theme) => ({
                        padding: "20px",
                    })}
                >
                    <Group spacing={30}>
                        <Image src={Logo} width={128} />
                        <Stack spacing={0}>
                            <Title order={4}>Class - {name}</Title>
                            <Title order={5}>Students and Passwords</Title>
                        </Stack>
                    </Group>
                    <StudentTable
                        students={students}
                        // forwardRef={tableRef}
                    />
                </Stack>
            </Box>
            <Group>
                <ReactToPrint trigger={() => <NumeroButton label="Print" />} content={() => printRef.current} />
            </Group>
            {/* <NumeroButton label="Print" onClick={() => {}} /> */}
        </>
    );
}

export default PrintStudentTable;
