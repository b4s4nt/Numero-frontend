// REACT
import { useContext } from "react";

// MANTINE
import { Container, Title, Text, Stack, Space, SimpleGrid, Transition, Box } from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";

// COMPONENTS
import DashboardCard from "../../common/Card/DashboardCard";
import NumeroTitle from "../../common/title/Title";

// CONTEXTS
import { SchoolContext } from "../../../contexts/SchoolContext";

// STYLE
import StudentsImage from "../../../images/school/school-dashboard-students.png";
import ClassesImage from "../../../images/school/school-dashboard-classes.png";
import TeachersImage from "../../../images/school/school-dashboard-teachers.png";
import SchoolImage from "../../../images/school/school-dashboard-school.png";

const cards = [
    {
        label: "Students",
        image: StudentsImage,
        link: "students",
    },
    {
        label: "Classes",
        image: ClassesImage,
        link: "classes",
    },
    {
        label: "Teachers",
        image: TeachersImage,
        link: "teachers",
    },
    {
        label: "School Details",
        image: SchoolImage,
        link: "details",
    },
    {
        label: "Reports",
        image: StudentsImage,
        link: "reports",
    },
    {
        label: "Resources",
        image: StudentsImage,
        link: "resources",
    },
];

const Home = () => {
    const { school } = useContext(SchoolContext);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <Stack
                sx={(theme) => ({
                    padding: smallScreen ? "30px 8px" : mediumScreen ? "30px 30px" : "28px 64px",
                })}
            >
                <Stack spacing={0}>
                    <Title order={mediumScreen ? 6 : 5}>Welcome back, {school?.name}</Title>
                    <NumeroTitle title={"Dashboard"} />
                    <Text>What would you like to see?</Text>
                </Stack>
                {mediumScreen ? null : <Space h={40} />}
                <SimpleGrid
                    cols={3}
                    breakpoints={[
                        { maxWidth: "sm", cols: 1 },
                        { maxWidth: "lg", cols: 2 },
                        { maxWidth: "xl", cols: 3 },
                    ]}
                >
                    {cards.map((card, index) => {
                        return <DashboardCard key={`dashboard-card-key${index}`} {...card} />;
                    })}
                </SimpleGrid>
            </Stack>
        </>
    );
};

export default Home;
