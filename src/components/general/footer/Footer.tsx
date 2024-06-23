// MANTINE IMPORTS
import { Center, Footer, Text } from "@mantine/core";

interface Props {}

const NumeroFooter = (props: Props) => {
    return (
        <Footer height={60} p="md">
            <Center>
                <Text
                    sx={(theme) => ({
                        color: theme.colors.gray[9],
                    })}
                >
                    © 2022 Numero®. All rights reserved.
                </Text>
            </Center>
        </Footer>
    );
};

export default NumeroFooter;
