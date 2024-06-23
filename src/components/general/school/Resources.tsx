import { Paper, Image, Text, Group, Stack, Title, List, Anchor, SimpleGrid } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import NumeroTitle from "../../common/title/Title";
import ClassesImage from "../../../images/school/school-dashboard-classes.png";
import { useContext } from "react";
import { SchoolContext } from "../../../contexts/SchoolContext";
import { IconCheck, IconPlus } from "@tabler/icons";
import { openModal } from "@mantine/modals";
import ResourceModalContent from "../../common/modal/ResourceModalContent";
import { howTo } from "../../../helpers/resources";

interface Props {}

const SchoolResources = (props: Props) => {
    const { schoolId, school, classes, students } = useContext(SchoolContext);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <NumeroTitle title="Resources" />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    height: "100%",
                    padding: "30px 90px",
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
                            <Title order={4}>Resources</Title>
                            <Text>{school?.name}</Text>
                        </Stack>
                    </Group>
                    {/* <NumeroButton label={"Add Class"} onClick={() => {}} /> */}
                </Group>

                <SimpleGrid cols={3}>
                    <Stack>
                        <Title order={5}>How to</Title>
                        <Stack>
                            <Title order={6}>Classes</Title>
                            <List spacing={8} icon={<IconCheck />}>
                                <List.Item>
                                    <Anchor
                                        onClick={() => {
                                            openModal({
                                                title: "How to Add New Class",
                                                children: (
                                                    <ResourceModalContent
                                                        title="How to Add New Class"
                                                        steps={howTo.classes.addClass}
                                                    />
                                                ),
                                            });
                                        }}
                                    >
                                        How to Add New Class ➡️
                                    </Anchor>
                                </List.Item>
                                <List.Item>How to Edit Class</List.Item>
                            </List>
                        </Stack>
                        <Stack>
                            <Title order={6}>Teachers</Title>
                            <List spacing={8} icon={<IconCheck />}>
                                <List.Item>How to Add New Teacher</List.Item>
                                <List.Item>How to Edit Teacher</List.Item>
                            </List>
                        </Stack>
                        <Stack>
                            <Title order={6}>Students</Title>
                            <List spacing={8} icon={<IconCheck />}>
                                <List.Item>How to Add New Student</List.Item>
                                <List.Item>How to Edit Student</List.Item>
                            </List>
                        </Stack>
                    </Stack>

                    <Stack>
                        <Title order={5}>Useful Links</Title>
                        <List spacing={8} icon={<IconCheck />}>
                            <List.Item>
                                <Anchor href="https://www.numero.org/history-of-numero/" target="_blank">
                                    History of Numero®
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://www.numero.org/numero-endorsements/" target="_blank">
                                    Numero® Endorsements
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://www.numero.org/learn-numero/" target="_blank">
                                    Learn Numero®
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor href="https://www.numero.org/numero-rules/" target="_blank">
                                    Numero® Rules
                                </Anchor>
                            </List.Item>
                            <List.Item>
                                <Anchor
                                    href="https://www.numero.org/numero-frequently-asked-questions/"
                                    target="_blank"
                                >
                                    Numero® FAQ
                                </Anchor>
                            </List.Item>
                        </List>
                    </Stack>
                </SimpleGrid>
            </Paper>
        </>
    );
};

export default SchoolResources;
