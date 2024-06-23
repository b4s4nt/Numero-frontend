// REACT IMPORTS

import { Box, Card, Center, createStyles, Divider, Image, Stack } from "@mantine/core";

// NEXT IMPORTS

// COMPONENT IMPORTS
import NumeroButton from "../button/Button";
// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import { useNavigate, useParams } from "react-router-dom";
import { pageRoutes } from "../../general/routes/pageRoutes";

interface Props {
    label: string;
    image: string;
    link: string;
}

const useStyle = createStyles((theme) => ({
    card: {
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: theme.shadows.xs,
        ":hover": {
            boxShadow: theme.shadows.lg,
            transform: "scale(1.02)",
        },
    },
}));

const DashboardCard = ({ label, image, link }: Props) => {
    const { schoolId } = useParams();
    const navigate = useNavigate();
    const { classes } = useStyle();

    return (
        <>
            <Card shadow="md" radius="lg" withBorder className={classes.card}>
                <Stack>
                    <Box
                        // p={"xl"}
                        sx={(theme) => ({
                            height: "250px",
                            // width: "100%",
                        })}
                    >
                        <Center
                            sx={(theme) => ({
                                ...theme.fn.cover(10),
                            })}
                        >
                            <Image withPlaceholder src={image} />
                        </Center>
                    </Box>
                    <Divider />
                    <Box p={"md"}>
                        <Center>
                            <NumeroButton
                                label={label}
                                onClick={() => {
                                    navigate(pageRoutes.SCHOOL_PAGE(schoolId, link));
                                }}
                            />
                        </Center>
                    </Box>
                </Stack>
            </Card>
        </>
    );
};

export default DashboardCard;
