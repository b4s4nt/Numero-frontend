// REACT IMPORTS
import { useContext, useEffect, useState } from "react";
// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../button/Button";

// MANTINE IMPORTS
import {
    Tabs,
    Text,
    Image,
    Group,
    Stack,
    TextInput,
    NumberInput,
    SimpleGrid,
    ActionIcon,
    Badge,
    Divider,
    ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals } from "@mantine/modals";
// NETWORK IMPORTS
import EditSchool from "../../../networking/api/School/EditSchool";

// TYPE IMPORTS

// FUNCTION IMPORTS
import { School } from "../../../interfaces/School";
import { AdminContext } from "../../../contexts/AdminContext";

// STYLE IMPORTS
import { IconStack2 } from "@tabler/icons";
import SchoolImage from "../../../images/school.png";

// interface Props extends School {}
interface Props {
    schoolId: number;
}

const SchoolModalContent = ({ schoolId }: Props) => {
    const { schools, fetchSchools } = useContext(AdminContext);
    const [school, setSchool] = useState<School>({} as School);

    const form = useForm({
        initialValues: {
            name: "",
            id: 0,
            subscription: 0,

            contact_Name: "",
            email: "",
            phone: "",
        },
        transformValues: (values) => {
            return {
                ...values,
                img: "",
            };
        },
    });

    const fetchEditSchool = async (school_id: number, value: Partial<School>) => {
        const req = new EditSchool(school_id);
        req.input(value);
        const res = await req.fetch();

        if (res.success) {
            fetchSchools();
        } else {
            console.error(res.error);
        }
        closeAllModals();
    };

    const handleSubmit = form.onSubmit((values) => {
        fetchEditSchool(values.id, values);
    });

    useEffect(() => {
        console.log("school", school);
        // setSchool((prev: School) => {
        //     return {
        //         ...prev,
        //         name: form.values.name,
        //         id: form.values.id,
        //         subscriptions: form.values.subscriptions,
        //         contact: {
        //             firstName: form.values.contact.firstName,
        //             lastName: form.values.contact.lastName,
        //             email: form.values.contact.email,
        //             phone: form.values.contact.phone,
        //         },
        //     };
        // });
    }, [form.values]);

    useEffect(() => {
        console.log("schools", schools);
        console.log("🚀 TCL ~ file: SchoolModalContent.tsx:100 ~ schools.find ~ id", schoolId);
        const c = schools.find((school) => {
            return school.id === schoolId;
        });
        console.log("🚀 TCL ~ file: SchoolModalContent.tsx:104 ~ c ~ c", c);
        setSchool(c as School);
    }, [schools]);

    useEffect(() => {
        if (!school) return;

        form.setValues({
            // ...school,
            name: school.name,
            id: school.id,
            subscription: school.subscription,

            contact_Name: school.contact_name,
            email: school.email,
            phone: school.phone,

            // schoolId,
            // name: school.name,
            // id: school.id,
            // subscriptions: school.subscriptions,
            // contact: {
            //     firstName: school.contact.firstName,
            //     lastName: school.contact.lastName,
            //     email: school.contact.email,
            //     phone: school.contact.phone,
            // },
        });
    }, [school]);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <ScrollArea
                sx={(theme) => ({
                    height: largeScreen ? "50vh" : mediumScreen ? "60vh" : smallScreen ? "70vh" : "70vh",
                })}
            >
                <Tabs
                    defaultValue={"detail"}
                    sx={(theme) => ({
                        padding: largeScreen ? "0 100px" : mediumScreen ? "0 50px" : smallScreen ? "0 20px" : "0 20px",
                    })}
                >
                    <Tabs.List>
                        <Tabs.Tab value={"detail"}>School Details</Tabs.Tab>
                        <Tabs.Tab value={"contact"}>School Contacts</Tabs.Tab>
                        <Tabs.Tab value={"sub"}>Subscriptions</Tabs.Tab>
                    </Tabs.List>
                    {/* DETAIL -------------------------------------------------- */}
                    <Tabs.Panel value={"detail"}>
                        <Group mt={60}>
                            <Image withPlaceholder src={school.image ?? SchoolImage} width={140} />
                            <Stack>
                                <Text weight={600} size={"md"}>
                                    {form.values.name}
                                </Text>
                                <Text>Granted Student Accounts: {form.values.subscription}</Text>
                                <Text>School ID: {form.values.id}</Text>
                            </Stack>
                        </Group>
                        <form>
                            <Stack mt={60}>
                                <TextInput
                                    label="School Name"
                                    placeholder="Enter School Name"
                                    {...form.getInputProps("name")}
                                />
                                {/* <TextInput
                                    disabled
                                    label="School Id"
                                    placeholder="Enter School id"
                                    {...form.getInputProps("id")}
                                /> */}
                            </Stack>
                        </form>
                    </Tabs.Panel>

                    {/* CONTACT -------------------------------------------------- */}
                    <Tabs.Panel value={"contact"}>
                        <Group mt={60}>
                            <Image withPlaceholder src={school.image || SchoolImage} width={140} />
                            <Stack>
                                <Text weight={600} size={"md"}>
                                    {form.values.name}
                                </Text>
                                <Text>Granted Student Accounts: {school.subscription}</Text>
                                <Text>School ID: {form.values.id}</Text>
                            </Stack>
                        </Group>
                        <form>
                            <Stack mt={60}>
                                <TextInput
                                    label="Contact Name"
                                    placeholder="Enter Contact Name"
                                    {...form.getInputProps("contact_name")}
                                />
                                <TextInput
                                    label="Email"
                                    placeholder="Enter Contact Email"
                                    {...form.getInputProps("email")}
                                />
                                <TextInput
                                    label="Phone Number"
                                    placeholder="Enter Contact Phone Number"
                                    {...form.getInputProps("phone")}
                                />
                            </Stack>
                        </form>
                    </Tabs.Panel>

                    {/* SUBSCRIPTION -------------------------------------------------- */}
                    <Tabs.Panel
                        value={"sub"}
                        sx={(theme) => ({
                            height: "40vh",
                        })}
                    >
                        <Group mt={60}>
                            <Image withPlaceholder src={school.image || SchoolImage} width={140} />
                            <Stack>
                                <Text weight={600} size={"md"}>
                                    {form.values.name}
                                </Text>
                                <Text>Granted Student Accounts: {school.subscription}</Text>
                                <Text>School ID: {form.values.id}</Text>
                            </Stack>
                        </Group>
                        <Stack mt={60}>
                            <Text>Select a number of subscriptions or type in manually.</Text>
                            <Group noWrap={smallScreen || mediumScreen ? true : false}>
                                <SimpleGrid
                                    cols={1}
                                    breakpoints={[
                                        { minWidth: "xs", cols: 2 },
                                        { minWidth: "sm", cols: 3 },
                                        { minWidth: "md", cols: 4 },
                                        { minWidth: 1200, cols: 5 },
                                    ]}
                                >
                                    {Array.from({ length: 10 }, (_, i) => (
                                        <Badge
                                            key={`badge-${i}`}
                                            color={"dark"}
                                            size="lg"
                                            sx={(theme) => ({
                                                width: "72px",
                                                cursor: "pointer",
                                                padding: "15px 10px",
                                            })}
                                            leftSection={
                                                <ActionIcon size={"sm"} color={"dark"}>
                                                    <IconStack2 />
                                                </ActionIcon>
                                            }
                                            onClick={() => form.setValues({ subscription: (i + 1) * 5 })}
                                        >
                                            {(i + 1) * 5}
                                        </Badge>
                                    ))}
                                </SimpleGrid>
                                <Divider size="md" orientation="vertical" mr={"md"} ml={"md"} />
                                <NumberInput
                                    size="md"
                                    placeholder="Subscriptions"
                                    label="Subscriptions"
                                    hideControls
                                    icon={<IconStack2 size={18} />}
                                    min={0}
                                    {...form.getInputProps("subscription")}
                                    sx={(theme) => ({
                                        input: {
                                            width: "120px",
                                            padding: "30px 40px",
                                        },
                                    })}
                                />
                            </Group>
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </ScrollArea>
            <Group position="right" mt={30}>
                <NumeroButton size={"md"} label="Discard" variant="subtle" onClick={() => closeAllModals()} />
                <NumeroButton size={"md"} label="Save Changes" variant="filled" onClick={() => handleSubmit()} />
            </Group>
        </>
    );
};

export default SchoolModalContent;
