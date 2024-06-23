// REACT IMPORTS

import {
    Group,
    Paper,
    Title,
    Image,
    Stack,
    Text,
    TextInput,
    Select,
    Checkbox,
    SimpleGrid,
    Divider,
    Box,
    NumberInput,
    ActionIcon,
    NumberInputHandlers,
} from "@mantine/core";
import { useEffect, useContext, useRef } from "react";
import { School, StateEnum, states } from "../../../interfaces/School";
import SchoolImage from "../../../images/school/school-dashboard-school.png";
import SchoolDetailImage from "../../../images/school/school-detail.png";
import NumeroButton from "../../common/button/Button";
import { useMediaQuery } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import NumeroTitle from "../../common/title/Title";
import { SchoolContext } from "../../../contexts/SchoolContext";
import EditSchool from "../../../networking/api/School/EditSchool";
import AddSchool from "../../../networking/api/School/AddSchool";
import { closeAllModals, openModal } from "@mantine/modals";
import SimpleModalContent from "../../common/modal/SimpleModalContent";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import ConfirmSchool from "../../../images/numero-confirm.png";
import { IconMinus, IconPlus } from "@tabler/icons";
import { filter } from "cypress/types/bluebird";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../routes/pageRoutes";
import { openSimpleModal } from "../../common/modal/openModalFn";

interface Props {
    mode?: "add" | "edit" | "view";
}

const SchoolDetail = ({ mode }: Props) => {
    // const [school, setSchool] = useState<School | null>(null);
    const { schoolId, school, fetchSchool } = useContext(SchoolContext);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            name: "",
            street: "",
            city: "",
            postcode: "",
            state: "",
            country: "Australia",
            abn: "",
            subscription: 10,
            active_subscription: 0,
            billing_entity: "",
            billing_abn: "",
            billing_street: "",
            billing_city: "",
            billing_postcode: "",
            billing_state: "",
            billing_country: "",
            contact_name: "",
            phone: "",
            email: "",
        },
        validate: {
            // name: (value: string) => (value ? undefined : "School name is required"),
            // street: (value: string) => (value ? undefined : "School street is required"),
            // abn: (value: string) => (value ? undefined : "School ABN is required"),
            // state: (value: string) => (value ? undefined : "School state is required"),
            // // billing: {
            // // entity: (value: string) => (value ? undefined : "Billing entity is required"),
            // // street: (value: string) => (value ? undefined : "Billing street is required"),
            // // abn: (value: string) => (value ? undefined : "Billing ABN is required"),
            // // state: (value: string) => (value ? undefined : "Billing state is required"),
            // // },
            // contact: {
            //     firstName: (value: string) => (value ? undefined : "Contact first name is required"),
            //     lastName: (value: string) => (value ? undefined : "Contact last name is required"),
            //     email: (value: string) => (value ? undefined : "Contact email is required"),
            //     phone: (value: string) => (value ? undefined : "Contact phone is required"),
            // },
        },
        transformValues: (values) => {
            return {
                ...values,
                is_active: true,
                img: "",
                billing_country: "Australia",
                house_number: "",
                billing_house_number: "",
            };
        },
    });

    const fetchAddSchool = async (value: Partial<School>) => {
        const req = new AddSchool();
        req.input(value);
        const res = await req.fetch();

        if (res.success) {
            openSimpleModal({
                children: <SimpleModalContent title={`School has been successfully added.`} img={ConfirmSchool} />,
            });

            fetchSchool(`${res.data.id}`);

            setTimeout(() => {
                closeAllModals();
                navigate(pageRoutes.ADMIN_DASHBOARD);
            }, 2000);
        } else {
            console.error(res.error);
        }
    };

    const fetchEditSchool = async (school_id: number, value: Partial<School>) => {
        const req = new EditSchool(school_id);
        req.input(value);
        const res = await req.fetch();

        if (res.success) {
            console.log("🚀 TCL ~ file: SchoolDetail.tsx:140 ~ fetchEditSchool ~ res", res.data);
            openSimpleModal({
                children: (
                    <SimpleModalContent title={`School detail has been successfully updated.`} img={ConfirmSchool} />
                ),
            });

            fetchSchool(`${schoolId}`);

            setTimeout(() => {
                closeAllModals();
            }, 2000);
        } else {
            console.error(res.error);
        }
    };

    const handleSubmit = form.onSubmit((values) => {
        console.log("🚀 TCL ~ file: SchoolDetail.tsx:150 ~ handleSubmit ~ values", values);
        console.log("🚀 TCL ~ file: SchoolDetail.tsx:153 ~ handleSubmit ~ mode", mode);
        console.log("🚀 TCL ~ file: SchoolDetail.tsx:169 ~ handleSubmit ~ schoolId", schoolId);

        if (mode === "add") {
            fetchAddSchool(values);
        } else if (mode === "edit") {
            if (!schoolId) return;
            fetchEditSchool(parseInt(schoolId), values);
        }
    });

    useEffect(() => {
        if (Object.keys(school).length === 0) return;

        form.setValues({
            name: school?.name,
            subscription: school?.subscription,
            street: school?.street,
            city: school?.city,
            postcode: school?.postcode,
            abn: school?.abn,
            state: school?.state,
            billing_entity: school?.billing_entity ?? "",
            billing_street: school?.billing_street ?? "",
            billing_city: school?.billing_city ?? "",
            billing_postcode: school?.billing_postcode ?? "",
            billing_state: school?.billing_state ?? "",
            contact_name: school?.contact_name ?? "",
            email: school?.email ?? "",
            phone: school?.phone ?? "",
        });
    }, [school]);

    const handleReset = () => {
        form.setValues({
            name: school?.name ?? "",
            subscription: school?.subscription,
            street: school?.street ?? "",
            abn: school?.abn ?? "",
            state: school?.state ?? "",
            billing_entity: school?.billing_entity ?? "",
            billing_street: school?.billing_street ?? "",
            billing_city: school?.billing_city ?? "",
            billing_postcode: school?.billing_postcode ?? "",
            billing_state: school?.billing_state ?? "",
            contact_name: school?.contact_name ?? "",
            email: school?.email ?? "",
            phone: school?.phone ?? "",
        });
    };

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const handlers = useRef<NumberInputHandlers>();

    return (
        <>
            <NumeroTitle title={"School Details"} />
            <Paper
                shadow={"md"}
                sx={(theme) => ({
                    height: "100%",
                    padding: "30px 90px",
                })}
            >
                <form onSubmit={handleSubmit}>
                    <Stack spacing="md">
                        <Group noWrap>
                            <Image withPlaceholder src={SchoolImage} height={150} width={150} />
                            <Stack ml={50}>
                                <Title order={4}>{school?.name ?? "Add New School"}</Title>
                                <Text>Granted Student Accounts</Text>
                                <Group>
                                    <ActionIcon
                                        disabled={form.values.subscription <= 10}
                                        size={36}
                                        color="red"
                                        onClick={() => {
                                            handlers.current?.decrement();
                                        }}
                                    >
                                        <IconMinus />
                                    </ActionIcon>

                                    <NumberInput
                                        handlersRef={handlers}
                                        placeholder="Enter Number of Students"
                                        step={5}
                                        min={10}
                                        hideControls
                                        {...form.getInputProps("subscription")}
                                        styles={{ input: { width: 54, textAlign: "center" } }}
                                    />
                                    <ActionIcon
                                        size={36}
                                        color="red"
                                        onClick={() => {
                                            handlers.current?.increment();
                                        }}
                                    >
                                        <IconPlus />
                                    </ActionIcon>
                                </Group>
                            </Stack>
                        </Group>
                        <SimpleGrid
                            cols={2}
                            spacing={100}
                            breakpoints={[{ maxWidth: 992, cols: 1, spacing: 20 }]}
                            sx={(theme) => ({
                                position: "relative",
                            })}
                        >
                            {/* School Details */}
                            <Stack>
                                <Title order={5}>School Details</Title>
                                <TextInput
                                    label="School Name"
                                    placeholder="Enter School Name"
                                    {...form.getInputProps("name")}
                                />
                                <TextInput
                                    label="School street"
                                    placeholder="Enter School Street"
                                    {...form.getInputProps("street")}
                                />
                                <TextInput
                                    label="School city"
                                    placeholder="Enter School City"
                                    {...form.getInputProps("city")}
                                />
                                <TextInput
                                    label="School postcode"
                                    placeholder="Enter School Postcode"
                                    {...form.getInputProps("postcode")}
                                />
                                <TextInput
                                    label="School ABN"
                                    placeholder="Enter School ABN"
                                    {...form.getInputProps("abn")}
                                />
                                <Select
                                    label="Geographic Region"
                                    placeholder="Choose your region"
                                    data={Object.keys(states)
                                        .filter((state) => {
                                            return state !== "ALL";
                                        })
                                        .map((key) => {
                                            return { label: states[key], value: key };
                                        })}
                                    {...form.getInputProps("state")}
                                />
                            </Stack>
                            {/* Billing Details */}
                            <Stack>
                                <Title order={5}>Billing Details</Title>
                                <TextInput
                                    label="Billing Entity"
                                    placeholder="Enter Entity Name"
                                    {...form.getInputProps("billing_entity")}
                                />
                                <TextInput
                                    label="Billing street"
                                    placeholder="Enter Billing street"
                                    {...form.getInputProps("billing_street")}
                                />
                                <TextInput
                                    label="Billing city"
                                    placeholder="Enter Billing City"
                                    {...form.getInputProps("billing_city")}
                                />
                                <TextInput
                                    label="Billing postcode"
                                    placeholder="Enter Billing Postcode"
                                    {...form.getInputProps("billing_postcode")}
                                />
                                <TextInput
                                    label="Billing ABN"
                                    placeholder="Enter Billing ABN"
                                    {...form.getInputProps("billing_abn")}
                                />
                                <Select
                                    label="Billing Region"
                                    placeholder="Choose your region"
                                    data={Object.entries(StateEnum).map(([key, value]) => {
                                        return { label: key, value: key };
                                    })}
                                    {...form.getInputProps("billing_state")}
                                />
                                <Checkbox
                                    label="Same as School street"
                                    onClick={() => {
                                        form.setValues({
                                            ...form.values,
                                            billing_entity: form.values.name ?? "",
                                            billing_street: form.values.street ?? "",
                                            billing_city: form.values.city ?? "",
                                            billing_postcode: form.values.postcode ?? "",
                                            billing_abn: form.values.abn ?? "",
                                            billing_state: form.values.state ?? "",
                                        });
                                    }}
                                />
                            </Stack>
                            {/* Contact Details */}
                            <Stack>
                                <Title order={5}>Contact Details</Title>
                                <TextInput
                                    label="Contact Name"
                                    placeholder="Enter Contact Name"
                                    {...form.getInputProps("contact_name")}
                                />
                                <TextInput label="Email" placeholder="Enter Email" {...form.getInputProps("email")} />
                                <TextInput
                                    label="Phone Number"
                                    placeholder="Enter Phone Number"
                                    {...form.getInputProps("phone")}
                                />
                            </Stack>
                            <Box
                                sx={(theme) => ({
                                    position: mediumScreen ? "relative" : "absolute",
                                    right: 0,
                                    bottom: 0,
                                    transform: "translateY(48px)",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                })}
                            >
                                <Image src={SchoolDetailImage} height={220} width={220} />
                            </Box>
                        </SimpleGrid>
                        <Divider my={30} />
                        <Group>
                            <NumeroButton
                                label={mode === "add" ? "Add School" : "Save Changes"}
                                type="submit"
                                onClick={() => handleSubmit()}
                            />
                            <NumeroButton label="Discard Changes" variant="subtle" onClick={handleReset} />
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </>
    );
};

export default SchoolDetail;
