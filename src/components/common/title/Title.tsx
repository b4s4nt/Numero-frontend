// REACT IMPORTS

import { Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    title: string;
}

const NumeroTitle = ({ title }: Props) => {
    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(min-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");
    const xSmallScreen = useMediaQuery("(max-width: 576px)");

    return (
        <>
            {mediumScreen && (
                <Title
                    order={largeScreen ? 2 : mediumScreen ? 3 : smallScreen ? 5 : 3}
                    transform="uppercase"
                    sx={(theme) => ({
                        // color: `${theme.fn.lighten(theme.black, 0.43)}`,
                        color: `#8f8d8d`,
                    })}
                >
                    {title}
                </Title>
            )}
        </>
    );
};

export default NumeroTitle;
