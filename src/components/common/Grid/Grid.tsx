// REACT IMPORTS

import { Tabs, SimpleGrid } from "@mantine/core";
import SchoolCard from "../Card/SchoolCard";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import SchoolImage from "../../../images/school.png";
import { useEffect } from "react";
import { School, StateEnum } from "../../../interfaces/School";

interface Props {
    data: School[];
}

const SchoolGrid = ({ data }: Props) => {
    return (
        <>
            <Tabs defaultValue={"all"}>
                <Tabs.List
                    grow
                    sx={(theme) => ({
                        backgroundColor: theme.colors.gray[3],
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        borderBottom: `2px solid ${theme.colors.gray[8]}`,
                    })}
                >
                    {/* TABS FOR ALL STATES */}
                    {Object.entries(StateEnum).map(([key, value]) => {
                        return (
                            <Tabs.Tab key={`state-tab-${key}`} value={value}>
                                {key}
                            </Tabs.Tab>
                        );
                    })}
                </Tabs.List>

                {/* SHOWING ALL SCHOOL */}
                <SchoolPanel data={data} state={StateEnum.ALL} />

                {/* SHOWING SCHOOLS BY STATE */}
                {Object.entries(StateEnum).map(([key, value]) => {
                    const schoolInState = data.filter((school) => school.state === key);
                    return <SchoolPanel key={`state-panel-${key}`} data={schoolInState} state={value} />;
                })}
            </Tabs>
        </>
    );
};

export default SchoolGrid;

interface PanelProps {
    data: School[];
    state: string;
}

const SchoolPanel = ({ data, state }: PanelProps) => {
    return (
        <Tabs.Panel value={state} pt={"md"}>
            <SimpleGrid
                cols={1}
                breakpoints={[
                    { minWidth: "xs", cols: 1 },
                    { minWidth: "sm", cols: 2 },
                    { minWidth: "md", cols: 3 },
                    { minWidth: "lg", cols: 4 },
                    { minWidth: "xl", cols: 5 },
                ]}
            >
                {data.map((school) => {
                    return <SchoolCard key={`School-${school.id}`} {...school} />;
                })}
            </SimpleGrid>
        </Tabs.Panel>
    );
};
