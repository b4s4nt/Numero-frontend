// REACT IMPORTS
import { useContext } from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroTitle from "../../common/title/Title";
import NumeroButton from "../../common/button/Button";
import TeacherTable from "../../common/table/TeacherTable";
import TeacherModalContent from "../../common/modal/TeacherModalContent";

// MANTINE IMPORTS
import { Group, Paper, Image, Title, Stack, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useMediaQuery } from "@mantine/hooks";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS
import { SchoolContext } from "../../../contexts/SchoolContext";

// STYLE IMPORTS
import TeachersImage from "../../../images/school/school-dashboard-teachers.png";

interface Props {}

const Teachers = (props: Props) => {
    const { schoolId, school } = useContext(SchoolContext);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const handleAddTeacher = (props: any) => {
        if (!schoolId) return;

        openModal({
            title: (
                <Title order={4} transform="capitalize">
                    Add A New Teacher
                </Title>
            ),
            children: <TeacherModalContent type="add" />,
        });
    };

    return (
        <>
            <NumeroTitle title={"Teachers"} />
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
                            src={TeachersImage}
                            height={largeScreen ? 150 : 75}
                            width={largeScreen ? 150 : 75}
                        />
                        <Stack>
                            <Title order={4}>Teachers</Title>
                            <Text>{school?.name}</Text>
                        </Stack>
                    </Group>
                    <NumeroButton label={"Add Teacher"} onClick={handleAddTeacher} />
                </Group>
                <TeacherTable />
            </Paper>
        </>
    );
};

export default Teachers;
