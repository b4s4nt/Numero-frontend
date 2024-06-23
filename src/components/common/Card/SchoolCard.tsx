// REACT IMPORTS

import { Button, Card, Group, Stack, Image, Text, Center, Badge, Box, UnstyledButton } from "@mantine/core";
import { openModal } from "@mantine/modals";
import { IconStack2 } from "@tabler/icons";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { School } from "../../../interfaces/School";
import { pageRoutes } from "../../general/routes/pageRoutes";
import SchoolModalContent from "../modal/SchoolModalContent";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    id: number;
    name: string;
    address: string;
    state: string;
    image: string;
    subscriptions: number;
}

const SchoolCard = (props: School) => {
    const { id, name, street, state, image, subscription } = props;
    const navigate = useNavigate();

    const openSchoolModal = () => {
        openModal({
            // id: "school-modal",
            padding: 50,
            centered: true,
            size: "70%",
            children: <SchoolModalContent schoolId={id} />,
        });
    };

    return (
        <Card
            shadow="sm"
            p="lg"
            radius={"md"}
            withBorder
            sx={(theme) => ({
                position: "relative",
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
            })}
        >
            <Card.Section
                sx={(theme) => ({
                    padding: "10px",
                    display: "flex",
                    justifyContent: "flex-end",
                })}
            >
                <Badge
                    leftSection={<IconStack2 size={18} />}
                    sx={(theme) => ({
                        backgroundColor: "transparent",
                        color: theme.black,
                        fontSize: theme.fontSizes.md,
                        fontWeight: 400,
                    })}
                >
                    {subscription}
                </Badge>
            </Card.Section>
            <Center mb={"xl"}>
                <Image withPlaceholder src={image} width={85} />
            </Center>
            <Stack mb={50} spacing={"xs"}>
                <Text weight={600} size={"md"}>
                    {name}
                </Text>
                <Text>{street}</Text>
                <Text>{state}</Text>
            </Stack>
            <Box
                sx={(theme) => ({
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                })}
            >
                <Box
                    sx={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "stretch",
                        minHeight: "55px",

                        button: {
                            width: "100%",
                            minHeight: "55px",
                            borderRadius: "0",
                            borderTop: `1px solid ${theme.colors.gray[2]}`,
                            borderLeft: `1px solid ${theme.colors.gray[2]}`,
                            textAlign: "center",
                            fontSize: theme.fontSizes.sm,
                            fontWeight: 500,
                            color: theme.colors.red[3],
                            ":hover": {
                                backgroundColor: theme.colors.gray[1],
                            },
                        },
                    })}
                >
                    <UnstyledButton color="red" onClick={openSchoolModal}>
                        Edit Details
                    </UnstyledButton>
                    <UnstyledButton
                        color="red"
                        onClick={() => {
                            navigate(pageRoutes.SCHOOL_DASHBOARD(id));
                        }}
                    >
                        View School
                    </UnstyledButton>
                </Box>
            </Box>
        </Card>
    );
};

export default SchoolCard;
