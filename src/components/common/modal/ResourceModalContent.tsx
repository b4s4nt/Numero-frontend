// REACT IMPORTS

import { Carousel } from "@mantine/carousel";
import { Stack, Title, Image, createStyles } from "@mantine/core";
import { IStep } from "../../../helpers/resources";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    title: string;
    steps?: IStep[];
}

const useStyles = createStyles((theme) => ({
    caption: {
        color: theme.black,
    },
    placeholder: {
        ...theme.fn.cover(),
    },
}));

const ResourceModalContent = ({ title, steps }: Props) => {
    const { classes } = useStyles();

    return (
        <Stack
            sx={(theme) => ({
                // height: "60vh",
                display: "flex",
                // width: "80vw",
            })}
        >
            <Carousel height="100%" slideGap={"md"} withIndicators sx={{ flex: 1 }}>
                {steps?.map((step, index) => (
                    <Carousel.Slide key={index} h={"100%"}>
                        <Image
                            height={"640px"}
                            src={step.image}
                            withPlaceholder
                            caption={`${step.title} - ${step.description}`}
                            classNames={{
                                caption: classes.caption,
                                placeholder: classes.placeholder,
                            }}
                        />
                    </Carousel.Slide>
                ))}
            </Carousel>
        </Stack>
    );
};

export default ResourceModalContent;
