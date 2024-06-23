// REACT IMPORTS
import { useContext } from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../../common/button/Button";
import NumeroTitle from "../../common/title/Title";
import StudentTable from "../../common/table/StudentTable";
import StudentContent from "../../common/modal/StudentModalContent";

// MANTINE IMPORTS
import { Paper, Group, Stack, Title, Image, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS
import { SchoolContext } from "../../../contexts/SchoolContext";

// STYLE IMPORTS
import StudentsImage from "../../../images/school/school-dashboard-students.png";

interface Props {}

const Students = (props: Props) => {
    const { school, students } = useContext(SchoolContext);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const handleAddStudent = (props: any) => {
        openModal({
            title: (
                <Title order={4} transform="capitalize">
                    Add A New Student
                </Title>
            ),
            children: <StudentContent type={"add"} />,
        });
    };

    return (
        <>
            <NumeroTitle title={`Students`} />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    // height: "100%",
                    minHeight: "calc(100vh - 100px - 60px - 60px - 45px - 137px)",
                    padding: smallScreen ? "30px 8px" : mediumScreen ? "30px 30px" : "30px 90px",
                })}
            >
                <Group position={smallScreen ? "center" : "apart"} mb={largeScreen ? 80 : 40}>
                    <Group position="center" spacing={largeScreen ? 50 : 20}>
                        <Image
                            withPlaceholder
                            src={StudentsImage}
                            height={largeScreen ? 150 : 75}
                            width={largeScreen ? 150 : 75}
                        />
                        <Stack>
                            <Title order={4}>Students ({`${students.length}/${school.subscription}`})</Title>
                            <Text>{school?.name}</Text>
                        </Stack>
                    </Group>
                    <NumeroButton label={"Add Student"} onClick={handleAddStudent} />
                </Group>
                <StudentTable />
            </Paper>
        </>
    );
};

export default Students;
