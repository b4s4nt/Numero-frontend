import { Group, Paper, Stack, Title, Text, Image, createStyles, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";
import { SchoolContext } from "../../../contexts/SchoolContext";
import NumeroButton from "../../common/button/Button";
import NumeroTitle from "../../common/title/Title";
import ClassesImage from "../../../images/school/school-dashboard-classes.png";
import {
    IconArrowUpRight,
    IconArrowDownRight,
    IconCoin,
    IconDiscount2,
    IconReceipt2,
    IconUserPlus,
    IconUser,
    IconPlayCard,
    TablerIcon,
    IconMathFunction,
    IconClock,
} from "@tabler/icons";

interface Props {}

const SchoolReports = (props: Props) => {
    const { schoolId, school, classes, students } = useContext(SchoolContext);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const stats = [
        {
            title: "Total Active Students",
            icon: <IconUser size={30} />,
            value: "8",
            diff: 2,
        },
        {
            title: "Total Games Played",
            icon: <IconPlayCard size={30} />,
            value: "88",
            diff: -8,
        },
        {
            title: "Average Game Score",
            icon: <IconMathFunction size={30} />,
            value: "158",
            diff: 10,
        },
        {
            title: "Average Game Time",
            icon: <IconClock size={30} />,
            value: "5:43",
            diff: 5,
        },
    ];

    return (
        <>
            <NumeroTitle title="Reports" />
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
                            <Title order={4}>Reports</Title>
                            <Text>{school?.name}</Text>
                        </Stack>
                    </Group>
                    {/* <NumeroButton label={"Add Class"} onClick={() => {}} /> */}
                </Group>
                <Stack>
                    {classes.length === 0 && students.length === 0 && (
                        <>
                            <Title order={5}>There is no activity yet.</Title>
                            <Text>Check back later.</Text>
                        </>
                    )}

                    {classes.length > 0 && (
                        <>
                            {/* <Title order={5}>Class Activities</Title> */}
                            {classes.map((c, index) => {
                                return (
                                    <Stack key={`class-activities-${index}`}>
                                        <Title order={5}>{c.name}</Title>
                                        <SimpleGrid
                                            cols={4}
                                            breakpoints={[
                                                { maxWidth: "md", cols: 2 },
                                                { maxWidth: "xs", cols: 1 },
                                            ]}
                                        >
                                            {stats.map((s, index) => {
                                                return <StateCard key={`class-activities-stat-${index}`} stat={s} />;
                                            })}
                                        </SimpleGrid>
                                    </Stack>
                                );
                            })}
                        </>
                    )}
                    {students.length > 0 && (
                        <>
                            <Title order={5}>Student Activities</Title>
                            {students.map((s) => {
                                return (
                                    <Stack>
                                        <Title order={6}>{`${s.firstName} ${s.lastName}`}</Title>
                                    </Stack>
                                );
                            })}
                        </>
                    )}
                </Stack>
            </Paper>
        </>
    );
};

export default SchoolReports;

const useStyles = createStyles((theme) => ({
    root: {
        padding: theme.spacing.xl * 1.5,
    },

    value: {
        fontSize: 24,
        fontWeight: 700,
        lineHeight: 1,
    },

    diff: {
        lineHeight: 1,
        display: "flex",
        alignItems: "center",
    },

    icon: {
        color: theme.colorScheme === "dark" ? theme.colors.dark[3] : theme.colors.gray[4],
    },

    title: {
        fontWeight: 700,
        textTransform: "uppercase",
        color: theme.black,
    },
}));

interface IStateCard {
    stat: {
        title: string;
        icon: JSX.Element;
        value: string;
        diff: number;
    };
}

const StateCard = ({ stat }: IStateCard) => {
    const { classes } = useStyles();

    const Icon = stat.icon;
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
        <Paper withBorder p="md" radius="md" key={stat.title}>
            <Group position="apart">
                <Text size="xs" color="dimmed" className={classes.title}>
                    {stat.title}
                </Text>
                {/* <Icon className={classes.icon} size={22} stroke={1.5} /> */}
                {stat.icon}
            </Group>

            <Group align="flex-end" spacing="xs" mt={25}>
                <Text className={classes.value}>{stat.value}</Text>
                <Text color={stat.diff > 0 ? "teal" : "red"} size="sm" weight={500} className={classes.diff}>
                    <span>{stat.diff}%</span>
                    <DiffIcon size={16} stroke={1.5} />
                </Text>
            </Group>

            <Text size="xs" mt={8}>
                Compared to previous month
            </Text>
        </Paper>
    );
};
