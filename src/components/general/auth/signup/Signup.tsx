// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../../../common/button/Button";
import Logo from "../../../../images/numero-logo.png";

// MANTINE IMPORTS
import { Center, createStyles, Image, Stack, Title, Text, List, ThemeIcon, PasswordInput, Box } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { School } from "../../../../interfaces/School";
import { IconCircleCheck, IconCircleX } from "@tabler/icons";
import { useForm } from "@mantine/form";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import NumeroBg from "../../../../images/numero-bg.png";

const useStyles = createStyles((theme) => ({
    logo: {
        position: "absolute",
        top: 20,
        left: 20,
    },
    container: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        background: theme.white,
        borderRadius: theme.radius.md,
        padding: theme.spacing.md,

        minHeight: "424px",
        width: "50%",
        transform: "translateX(-200px)",
        [theme.fn.smallerThan("lg")]: {
            transform: "translateX(0px)",
        },
        [theme.fn.smallerThan("sm")]: {
            width: "90%",
        },
    },
    boxContent: {
        height: "100%",
        maxWidth: "650px",
        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
    },
    label: {
        color: "#121212",
        opacity: "0.87",
        fontSize: "16px",
        fontWeight: 300,
    },
    input: {
        backgroundColor: "#1212120B",
        border: "1px solid #12121234",
    },
    button: {
        width: "65%",
        [theme.fn.smallerThan("sm")]: {
            width: "100%",
        },
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
        },
    },
}));

interface Props {}

const Signup = (props: Props) => {
    const { classes } = useStyles();
    const { schoolId } = useParams();

    const [visible, { toggle }] = useDisclosure(false);
    const [school, setSchool] = useState<School | null>(null);

    const mediumScreen = useMediaQuery("(max-width: 992px)");

    const form = useForm({
        initialValues: { password: "", confirmPassword: "" },
        validateInputOnChange: true,
        validate: {
            password: (value) => {
                if (value.length < 8) return true;
                if (
                    !/[0-9]/.test(value) ||
                    !/[a-z]/.test(value) ||
                    !/[A-Z]/.test(value) ||
                    !/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)
                ) {
                    return true;
                }

                return null;
            },
            confirmPassword: (value, values) => {
                if (value !== values.password) return true;
                else return null;
            },
        },
    });

    const requirements = [
        { re: /[0-9]/, label: "Includes number" },
        { re: /[a-z]/, label: "Includes lowercase letter" },
        { re: /[A-Z]/, label: "Includes uppercase letter" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
    ];

    const PasswordRequirements = ({ meets, label }: { meets: boolean; label: string }) => {
        return (
            <List.Item
                icon={
                    meets ? (
                        <ThemeIcon radius="xl" color={"green"}>
                            <IconCircleCheck />
                        </ThemeIcon>
                    ) : (
                        <ThemeIcon radius="xl" color={"red"}>
                            <IconCircleX />
                        </ThemeIcon>
                    )
                }
            >
                {label}
            </List.Item>
        );
    };
    const checks = requirements.map((requirement, index) => (
        <PasswordRequirements key={index} label={requirement.label} meets={requirement.re.test(form.values.password)} />
    ));

    // useEffect(() => {
    //     if (!schoolId) return;
    //     stubSchools.filter((s) => s.id === parseInt(schoolId)).map((s) => setSchool(s));
    // }, [schoolId]);

    return (
        <Stack>
            {/* BACKGROUND */}
            <Box
                sx={(theme) => ({
                    ...theme.fn.cover(),
                    backgroundPosition: "right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "auto 100%",
                    backgroundImage: `url(${NumeroBg})`,
                })}
            ></Box>

            {!mediumScreen ? <Image src={Logo} alt="Numero Logo" width={192} className={classes.logo} /> : null}

            <Stack className={classes.container}>
                <Stack className={classes.box} spacing={76}>
                    {/* WELCOME TITLE */}
                    <Stack spacing={70}>
                        {mediumScreen ? (
                            <Center>
                                <Image src={Logo} alt="Numero Logo" width={192} />
                            </Center>
                        ) : null}
                        <Stack spacing={0}>
                            <Title size={32} weight={400} order={3}>
                                Welcome to Numero.
                            </Title>
                            <Title size={62} weight={500} order={1}>
                                {school?.name}
                            </Title>
                            <Text>Continue setting up your account. Start with creating a password below.</Text>
                            <Text>Click the button to create your password and login to the portal.</Text>
                        </Stack>
                    </Stack>

                    {/* Setup Password */}
                    <Stack justify="flex-end" spacing={30} className={classes.boxContent}>
                        <Text size={24} weight={500}>
                            Create Password
                        </Text>
                        <Stack>
                            <PasswordInput
                                size="md"
                                placeholder="Create password"
                                label="Create password"
                                withAsterisk
                                visible={visible}
                                onVisibilityChange={toggle}
                                classNames={{
                                    label: classes.label,
                                    input: classes.input,
                                }}
                                {...form.getInputProps("password")}
                            />
                            {form.isTouched("password") && (
                                <List
                                    sx={(theme) => ({
                                        borderLeft: `1px solid ${theme.colors.gray[5]}`,
                                    })}
                                    withPadding
                                >
                                    <PasswordRequirements
                                        label="At least 8 characters"
                                        meets={form.values.password.length >= 8}
                                    />
                                    {checks}
                                </List>
                            )}
                            <PasswordInput
                                size="md"
                                placeholder="Confirm password"
                                label="Confirm password"
                                withAsterisk
                                visible={visible}
                                onVisibilityChange={toggle}
                                classNames={{
                                    label: classes.label,
                                    input: classes.input,
                                }}
                                {...form.getInputProps("confirmPassword")}
                            />
                            {form.isTouched("confirmPassword") && (
                                <List
                                    sx={(theme) => ({
                                        borderLeft: `1px solid ${theme.colors.gray[5]}`,
                                    })}
                                    withPadding
                                >
                                    <PasswordRequirements
                                        label={
                                            form.values.password === form.values.confirmPassword &&
                                            form.values.password.length > 0
                                                ? "Passwords match"
                                                : "Passwords do not match"
                                        }
                                        meets={
                                            form.values.password === form.values.confirmPassword &&
                                            form.values.password.length > 0
                                        }
                                    />
                                </List>
                            )}
                        </Stack>

                        <NumeroButton
                            label="Create Password & Log in"
                            variant="filled"
                            className={classes.button}
                            disabled={!form.isValid()}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Signup;
