// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS
import { Center, Title, Image, Stack } from "@mantine/core";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    title: string;
    img: string;
}

const SimpleModalContent = ({ title, img }: Props) => {
    return (
        <Center>
            <Stack align={"center"}>
                <Image withPlaceholder src={img} width={350} />
                <Title order={4}>{title}</Title>
            </Stack>
        </Center>
    );
};

export default SimpleModalContent;
