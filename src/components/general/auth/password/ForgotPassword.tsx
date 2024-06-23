// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../../../common/button/Button";
import Logo from "../../../../images/numero-logo.png";

// MANTINE IMPORTS
import {
    Center,
    createStyles,
    Image,
    Stack,
    Title,
    Text,
    List,
    ThemeIcon,
    PasswordInput,
    TextInput,
    Box,
} from "@mantine/core";
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

        minHeight: "450px",
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
        // height: "100%",
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

const ForgotPassword = (props: Props) => {
    const { classes } = useStyles();

    const mediumScreen = useMediaQuery("(max-width: 992px)");

    const form = useForm({
        initialValues: { email: "" },
        validateInputOnChange: true,
        validate: {
            email: (value: string) => {
                const emailRegex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const isValid = emailRegex.test(value);
                return isValid ? null : "Email is invalid";
            },
        },
    });

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
                <Stack className={classes.box} spacing={30}>
                    {/* WELCOME TITLE */}
                    <Stack spacing={70}>
                        {mediumScreen ? (
                            <Center>
                                <Image src={Logo} alt="Numero Logo" width={192} />
                            </Center>
                        ) : null}
                        <Stack spacing={0}>
                            <Title order={5}>Welcome back to Numero</Title>
                            <Title order={4}>Recover your password</Title>
                        </Stack>
                    </Stack>

                    {/* Setup Password */}
                    <Stack justify="flex-end" spacing={"md"} className={classes.boxContent}>
                        <Text>Don't worry, we got you.</Text>
                        <Text>Enter your email address and we'll send you a link to reset your password</Text>
                        <Stack>
                            <TextInput label="Email" placeholder="Email" {...form.getInputProps("email")} />
                        </Stack>

                        <NumeroButton
                            label="Reset Password"
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

export default ForgotPassword;
