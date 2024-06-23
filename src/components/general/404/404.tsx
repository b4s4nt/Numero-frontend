import { Stack, Title, Text, Button, createStyles, Group, Image, Container, Box, Center } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import NumeroButton from "../../common/button/Button";
import NumeroTitle from "../../common/title/Title";
import Logo from "../../../images/numero-logo.png";
import { useMediaQuery } from "@mantine/hooks";

import NumeroBg from "../../../images/numero-bg-light.png";
import { pageRoutes } from "../routes/pageRoutes";

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: 80,
        paddingBottom: 80,
    },

    label: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: 220,
        lineHeight: 1,
        marginBottom: theme.spacing.xl * 1.5,
        color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.fn.darken(theme.colors.gray[9], 0.3),

        [theme.fn.smallerThan("sm")]: {
            fontSize: 120,
        },
    },

    title: {
        textAlign: "center",
        fontWeight: 900,
        fontSize: 38,

        [theme.fn.smallerThan("sm")]: {
            fontSize: 32,
        },
    },

    description: {
        maxWidth: 500,
        margin: "auto",
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xl * 1.5,
    },
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
}));

const NotFound = () => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const mediumScreen = useMediaQuery("(max-width: 992px)");

    return (
        <Stack>
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
                <Center
                    sx={(theme) => ({
                        ...theme.fn.cover(),
                    })}
                >
                    <Stack>
                        <div className={classes.label}>404</div>
                        <Title className={classes.title}>You have found a secret place.</Title>
                        <Text color="black" size="lg" align="center" className={classes.description}>
                            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                            been moved to another URL.
                        </Text>
                        <Group position="center">
                            <NumeroButton
                                label="Take me back to sign in page"
                                variant="subtle"
                                size="md"
                                onClick={() => {
                                    navigate(pageRoutes.LOGIN);
                                }}
                            />
                        </Group>
                    </Stack>
                </Center>
            </Stack>
        </Stack>
    );
};

export default NotFound;

{
    /* <Stack
sx={(theme) => ({
    padding: "28px 64px",
})}
>
<Stack spacing={0}>
    <Title order={5}></Title>
    <NumeroTitle title={"404 PAGE NOT FOUND"} />
    <Text>Something went wrong.</Text>
</Stack>
</Stack> */
}
