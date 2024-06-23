import { Anchor, Breadcrumbs, Group, Text } from "@mantine/core";
import { IconLayout2 } from "@tabler/icons";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import { SchoolContext } from "../../../contexts/SchoolContext";

function NumeroBreadcrumbs() {
    const location = useLocation();
    const { school } = useContext(SchoolContext);

    // Extract the pathname from the location object
    const pathnames = location.pathname.split("/").filter((x) => x);
    // .map((x) => {
    //     return x.charAt(0).toUpperCase() + x.slice(1);
    // });

    const path: (string | JSX.Element)[] = [];

    path[0] = (
        <Anchor color={"red"} component={Link} to={`${pathnames[1]}`} key={`dashboard`}>
            <Group spacing={"xs"}>
                <IconLayout2 />

                <Text transform="capitalize">{school.name ?? "Dashboard"}</Text>
            </Group>
        </Anchor>
    );
    path[1] = (
        <span key={`section-${pathnames[2]}`}>
            <Text transform="capitalize">{pathnames[2]}</Text>
        </span>
    );

    if (pathnames.length > 3) {
        path[1] = (
            <Anchor
                color={"red"}
                component={Link}
                to={`${pathnames[1]}/${pathnames[2]}`}
                key={`section-${pathnames[2]}`}
            >
                <Text transform="capitalize">{pathnames[2]}</Text>
            </Anchor>
        );

        path[2] = (
            <span key={`section-${pathnames[3]}`}>
                <Text transform="capitalize">{pathnames[3]}</Text>
            </span>
        );
    }

    // const items = pathnames.map((pathname, index) => {
    //     // Build the breadcrumb path using the pathnames
    //     const breadcrumbPath = `/${pathnames.slice(0, index + 1).join("/")}`;

    //     return (
    //         <span key={breadcrumbPath}>
    //             {/* <Link to={breadcrumbPath}>{pathname}</Link> */}
    //             {/* {index < pathnames.length - 1 && <i> / </i>} */}
    //         </span>
    //     );
    // });

    return <>{pathnames.length > 2 && <Breadcrumbs pb={"md"}>{path}</Breadcrumbs>}</>;
}

export default NumeroBreadcrumbs;
