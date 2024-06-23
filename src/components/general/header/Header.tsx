// REACT IMPORTS
import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS
import { Anchor, Avatar, Burger, createStyles, Group, Header, Image, Stack } from "@mantine/core";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS
import { NavContext } from "../nav/context/context";

// STYLE IMPORTS
import { IconLogout } from "@tabler/icons";
import Logo from "../../../images/numero-logo.png";
import Logout from "../../../networking/api/Auth/Logout";
import { pageRoutes } from "../routes/pageRoutes";

interface Props {}

const useStyles = createStyles((theme) => ({
    root: {
        minWidth: "90px",
        minHeight: "32px",
        fontWeight: 600,
        color: theme.colors.red[3],
        ":after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "0",
            height: 2,
            backgroundColor: theme.colors.red[3],
        },
        ":hover": {
            textDecoration: "none",
            ":after": {
                width: "100%",
                transition: "width 0.3s ease",
            },
        },
    },
    links: {
        fontSize: "14px",
        [theme.fn.smallerThan("md")]: {
            display: "none",
        },
    },
    burger: {
        [theme.fn.largerThan("md")]: {
            display: "none",
        },
    },

    active: {
        color: theme.black,
        ":after": {
            width: "100%",
            backgroundColor: theme.black,
        },
    },

    mobileActive: {
        height: "calc(100vh - 60px - 100px)",
        position: "absolute",
        width: "100%",
        transform: "translateX(-100px)",

        backgroundColor: theme.white,
        a: {
            height: "15%",
            transition: "background-color 0.3s ease",
            ":hover": {
                backgroundColor: theme.fn.lighten(theme.colors.red[0], 0.8),
            },
        },
        ":after": {
            width: "100%",
            backgroundColor: theme.black,
        },
    },
}));

const NumeroHeader = (props: Props) => {
    const { navOpen, toggleNav } = useContext(NavContext);

    const { classes, cx } = useStyles();

    const location = useLocation();
    const navigate = useNavigate();
    const { schoolId } = useParams();

    useEffect(() => {
        console.log("🚀 TCL ~ file: Header.tsx:101 ~ useEffect ~ location.pathname", location.pathname);
    }, [location]);

    const fetchLogout = async () => {
        const req = new Logout();
        const res = await req.fetch();

        if (res.success) {
            navigate(pageRoutes.LOGIN);
        } else {
            console.log(res.message);
        }
    };

    const schoolAdminLinks = (
        <>
            <Anchor
                component={Link}
                to={`${schoolId}`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname === `/school/${schoolId}`,
                })}
            >
                Dashboard
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/students`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/students(\/\w+)?(\/\w+)?$/),
                })}
            >
                Students
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/classes`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/classes(\/\w+)?(\/\w+)?$/),
                })}
            >
                Classes
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/teachers`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/teachers(\/\w+)?(\/\w+)?$/),
                })}
            >
                Teachers
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/details`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname === `/school/${schoolId}/details`,
                })}
            >
                Details
            </Anchor>
        </>
    );
    const julieLinks = (
        <>
            <Anchor
                component={Link}
                to={`/admin/dashboard`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname === `/admin/dashboard`,
                })}
            >
                Dashboard
            </Anchor>
        </>
    );
    const teacherLinks = (
        <>
            <Anchor
                component={Link}
                to={`${schoolId}`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname === `/school/${schoolId}`,
                })}
            >
                Dashboard
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/students`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/students(\/\w+)?(\/\w+)?$/),
                })}
            >
                Students
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/classes`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/classes(\/\w+)?(\/\w+)?$/),
                })}
            >
                Classes
            </Anchor>
            <Anchor
                component={Link}
                to={`${schoolId}/resources`}
                className={cx(classes.root, {
                    [classes.active]: location.pathname.match(/^\/school\/(\w+)\/resources(\/\w+)?(\/\w+)?$/),
                })}
            >
                Resources
            </Anchor>
        </>
    );

    return (
        <Header height={100} fixed>
            <Group position="apart" align={"center"} sx={{ height: 100 }}>
                <Anchor component={Link} to={schoolId ? schoolId : "/admin/dashboard"}>
                    <Image src={Logo} width={128} />
                </Anchor>
                <Group spacing={8} className={classes.links}>
                    {location.pathname.includes("admin") || location.pathname.includes("julie")
                        ? julieLinks
                        : schoolAdminLinks}

                    <Anchor className={classes.root} onClick={fetchLogout}>
                        <IconLogout style={{ transform: "rotate(180deg)" }} />
                        Logout
                    </Anchor>
                    <Avatar color="red" radius="xl" variant="filled">
                        JR
                    </Avatar>
                </Group>
                <Burger opened={navOpen} onClick={toggleNav} className={classes.burger} size="md" color="red" />
            </Group>
            {navOpen && (
                <Stack className={classes.mobileActive} justify={"space-around"}>
                    {location.pathname.includes("admin") || location.pathname.includes("julie")
                        ? julieLinks
                        : schoolAdminLinks}
                </Stack>
            )}
        </Header>
    );
};

export default NumeroHeader;
