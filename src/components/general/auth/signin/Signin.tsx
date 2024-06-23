// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../../../common/button/Button";
import Logo from "../../../../images/numero-logo.png";

// MANTINE IMPORTS
import { Center, createStyles, Image, Stack, TextInput, Title, Text, Anchor, Box, PasswordInput } from "@mantine/core";
import { useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import NumeroBg from "../../../../images/numero-bg.png";
import { useForm } from "@mantine/form";
import Login from "../../../../networking/api/Auth/Login";
import { pageRoutes } from "../../routes/pageRoutes";

interface Props {}

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
        [`@media (max-width: ${theme.breakpoints.lg}px)`]: {
            transform: "translateX(0px)",
        },
        [`@media (max-width: ${theme.breakpoints.md}px)`]: {
            width: "90%",
        },
    },
    boxContent: {
        height: "100%",
        width: "80%",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: "100%",
        },
    },
    label: {
        color: theme.black,
        opacity: "0.87",
        fontSize: "16px",
        fontWeight: 300,
    },
    input: {
        backgroundColor: `${theme.black}0B`,
        border: `1px solid ${theme.black}34`,
    },
    button: {
        width: "25%",
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            width: "40%",
        },
        [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
            width: "60%",
        },
    },
}));

const Signin = (props: Props) => {
    const { classes } = useStyles();
    const { schoolId } = useParams();
    const navigate = useNavigate();

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    const [token, setToken] = useLocalStorage<string>({ key: "token", defaultValue: "" });

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },
        validate: {
            // email validation in australia
            email: (value: string) => {
                if (value.length < 1) return "Email is required";
                const emailRegex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return emailRegex.test(value) ? null : "Email is invalid";
            },
            password: (value: string) => {
                return value.length > 0 ? null : "Password is required";
            },
        },
    });

    const fetchSignin = async (value: { email: string; password: string }) => {
        const req = new Login();
        req.input(value);
        const res = await req.fetch();

        if (res.success) {
            setToken(res.data.token);

            const { school_id } = res.data;
            navigate(pageRoutes.SCHOOL_DASHBOARD(schoolId));
        } else {
            console.log(res.message);
        }
    };

    const handleSubmit = form.onSubmit((value) => {
        fetchSignin(value);
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

            <form onSubmit={handleSubmit}>
                <Stack className={classes.container}>
                    <Stack className={classes.box}>
                        <Stack spacing={70}>
                            {mediumScreen ? (
                                <Center>
                                    <Image src={Logo} alt="Numero Logo" width={192} />
                                </Center>
                            ) : null}
                            <Stack spacing={0}>
                                <Title size={32} weight={400} order={3}>
                                    Welcome to the
                                </Title>
                                <Title size={74} weight={500} order={1}>
                                    Numero Portal.
                                </Title>
                            </Stack>
                        </Stack>
                        <Stack justify="flex-end" spacing={15} className={classes.boxContent}>
                            <Stack>
                                <TextInput
                                    size="md"
                                    placeholder="Email"
                                    label="Email"
                                    classNames={{
                                        label: classes.label,
                                        input: classes.input,
                                    }}
                                    {...form.getInputProps("email")}
                                />
                                <PasswordInput
                                    size="md"
                                    placeholder="Password"
                                    label="Password"
                                    classNames={{
                                        label: classes.label,
                                        input: classes.input,
                                    }}
                                    {...form.getInputProps("password")}
                                />
                            </Stack>
                            <Text align="right">
                                <Anchor component={Link} to={`/auth/forgot-password`} color="red">
                                    Forgot Password
                                </Anchor>
                            </Text>
                            <NumeroButton
                                type="submit"
                                label="Login"
                                variant="filled"
                                className={classes.button}
                                onClick={() => {
                                    handleSubmit();
                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </form>
        </Stack>
    );
};

export default Signin;
