// REACT
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";

// MANTINE
import { AppShell, Container, Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";

// COMPONENTS
import NumeroHeader from "../header/Header";
import Footer from "../footer/Footer";
import NumeroBreadcrumbs from "../../common/breadcrumbs/Breadcrumbs";

// CONTEXTS
import NavProvider from "../nav/NavProvider";
import { LoadingContext } from "../loading/context/context";
import { SchoolContextProvider } from "../../../contexts/SchoolContext";
import { AdminContextProvider } from "../../../contexts/AdminContext";

import NumeroBgLight from "../../../images/numero-bg-light.png";

const Dashboard = () => {
    const { loading, setLoading } = useContext(LoadingContext);

    const [opened, setOpened] = useState<boolean>(false);

    // useEffect(() => {
    //     setLoading(false);
    // }, []);

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <AdminContextProvider>
            <SchoolContextProvider>
                <ModalsProvider>
                    <NavProvider>
                        <>
                            {/* {loading ? (
                                <FullLoader cover fullscreen opacity={loaderOpacity.total} size={loaderSize.medium} />
                            ) : ( */}
                            <AppShell
                                header={<NumeroHeader />}
                                padding={0}
                                footer={<Footer />}
                                sx={(theme) => ({
                                    background: `url(${NumeroBgLight})`,
                                    // backgroundSize: "cover",
                                    backgroundPosition: "right",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "auto 100%",
                                })}
                            >
                                <Stack
                                    spacing={0}
                                    sx={{
                                        border: 0,
                                        minHeight: "calc(100vh - 100px - 60px)",
                                        padding: smallScreen ? "36px 0 77px 0" : "36px 10px 20px 0",
                                    }}
                                >
                                    {/*this Outlet is to display the sub-route component correlating to the current url path*/}
                                    <div
                                        style={{
                                            height: "100%",
                                            padding: mediumScreen ? "0 30px 0" : "0 77.5px 0",
                                        }}
                                    >
                                        <NumeroBreadcrumbs />
                                        <Container
                                            // ref={nodeRef}
                                            sx={(theme) => ({
                                                maxWidth: "1460px",
                                                minHeight: "calc(100vh - 100px - 60px - 60px - 45px)",
                                                backgroundColor: theme.colors.gray[3],
                                                borderRadius: theme.radius.md,
                                                padding: mediumScreen ? "30px 30px" : "30px 60px",
                                            })}
                                        >
                                            <Outlet />
                                        </Container>
                                    </div>
                                </Stack>
                            </AppShell>
                            {/* )} */}
                        </>
                    </NavProvider>
                </ModalsProvider>
            </SchoolContextProvider>
        </AdminContextProvider>
    );
};

export default Dashboard;

const links = (schoolId: number) => [
    {
        title: "Dashboard",
        id: schoolId,
        to: `/school/${schoolId}`,
        pathRegex: /^\/school\/(\w+)$/,
    },
    {
        title: "Students",
        id: schoolId,
        to: `/school/${schoolId}/students`,
        pathRegex: /^\/school\/(\w+)\/students(\/\w+)?(\/\w+)?$/,
    },
    {
        title: "Classes",
        id: schoolId,
        to: `/school/${schoolId}/classes`,
        pathRegex: /^\/school\/(\w+)\/classes(\/\w+)?(\/\w+)?$/,
    },
    {
        title: "Teachers",
        id: schoolId,
        to: `/school/${schoolId}/teachers`,
        pathRegex: /^\/school\/(\w+)\/teachers(\/\w+)?(\/\w+)?$/,
    },
    {
        title: "Details",
        id: schoolId,
        to: `/school/${schoolId}/details`,
        pathRegex: /^\/school\/(\w+)\/details$/,
    },
];
