// REACT IMPORTS

import { Badge } from "@mantine/core";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    active: boolean;
    size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const ActiveBadge = ({ active, size }: Props) => {
    return active ? (
        <Badge color="green" size={size ?? "md"}>
            Active
        </Badge>
    ) : (
        <Badge color="red" size={size ?? "md"}>
            Inactive
        </Badge>
    );
};

export default ActiveBadge;
