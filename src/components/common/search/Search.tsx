import { Box, Input, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import React, { useEffect, useState } from "react";
import styles from "./Search.module.css";

interface IProps {
    fluid?: boolean;
}

const Search = (props: IProps) => {
    const [classString, setClassString] = useState<string>("field label prefix border surface");
    const [inputString, setInputString] = useState<string>("");

    useEffect(() => {
        if (Object.entries(props)?.length) {
            let cpState = classString;
            let cpLoaderState = inputString;
            Object.entries(props).forEach((entry) => {
                const prop = entry[0];
                const value = entry[1];
                if (value && typeof value === "boolean") {
                    cpState += ` ${prop}`;
                } else if (value && typeof value === "string") {
                    switch (prop) {
                        case "size":
                            cpLoaderState += ` ${value}`;
                            break;
                        case "opacity":
                            cpLoaderState += ` opacity-${value}`;
                            break;
                    }
                    setInputString(cpLoaderState);
                }
            });
            setClassString(cpState);
        }
    }, []);
    return (
        <Box
            sx={(theme) => ({
                width: "66%",
                alignSelf: "center",
            })}
        >
            <Stack spacing={0}>
                <Text>Search</Text>
                <Input placeholder="Search" icon={<IconSearch />} />
            </Stack>
        </Box>
    );
};

export default Search;
