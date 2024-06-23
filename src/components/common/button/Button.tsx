// REACT IMPORTS
import React from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS
import { Button, createStyles, DefaultProps, MantineColor, MantineNumberSize, MantineSize } from "@mantine/core";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props extends DefaultProps {
    color?: MantineColor;
    disabled?: boolean | number;
    label: string;
    height?: MantineNumberSize;
    radius?: MantineNumberSize;
    size?: MantineSize;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    type?: "button" | "submit" | "reset";
    variant?: "default" | "outline" | "light" | "filled" | "subtle" | "white";
    leftIcon?: React.ReactNode;
    others?: any;
}

const useStyles = createStyles((theme, { height }: Props) => ({
    root: {
        height: height,
        fontSize: "16px",
        fontWeight: 400,
    },
}));

const NumeroButton = ({
    disabled,
    color,
    label,
    height,
    radius = "md",
    size = "lg",
    classNames,
    styles,
    unstyled,
    className,
    type,
    variant,
    leftIcon,
    ...others
}: Props) => {
    const { classes, cx } = useStyles(
        { label, height, radius, variant, type, size },
        { name: "NumeroButton", classNames, unstyled }
    );

    return (
        <Button
            leftIcon={leftIcon}
            color={color}
            disabled={disabled ? true : false}
            onClick={others.onClick}
            radius={radius}
            variant={variant}
            size={size}
            className={cx(classes.root, className)}
            type={type}
            {...others}
        >
            {label}
        </Button>
    );
};

export default NumeroButton;
