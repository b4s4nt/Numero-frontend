// REACT
import { useContext, useState } from "react";
// MANTINE
import { Stack, SegmentedControl, Group, ScrollArea } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

// COMPONENTS
import SchoolGrid from "../../common/Grid/Grid";
import Search from "../../common/search/Search";
import SchoolTable from "../../common/table/SchoolTable";
import NumeroTitle from "../../common/title/Title";

// CONTEXTS
import { AdminContext } from "../../../contexts/AdminContext";

// STYLE
import { IconGridDots, IconList } from "@tabler/icons";
import NumeroButton from "../../common/button/Button";
import { useNavigate } from "react-router-dom";
import { pageRoutes } from "../routes/pageRoutes";

const Home = () => {
    const navigate = useNavigate();
    const { schools } = useContext(AdminContext);

    const [view, setView] = useState<string>("grid");

    const largeScreen = useMediaQuery("(min-width: 1200px)");
    const mediumScreen = useMediaQuery("(max-width: 992px)");
    const smallScreen = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <Stack
                sx={(theme) => ({
                    padding: mediumScreen ? "14px 32px" : "28px 64px",
                })}
            >
                <Group position="apart">
                    <NumeroTitle title={"School Search"} />
                    <NumeroButton
                        label={"Add School"}
                        onClick={() => {
                            navigate(`/school/add`);
                            navigate(pageRoutes.ADMIN_ADD_SCHOOL);
                        }}
                    />
                </Group>
                <Search />

                <Group position={"right"}>
                    <SegmentedControl
                        color={"red"}
                        value={view}
                        onChange={setView}
                        data={[
                            { label: <IconGridDots />, value: "grid" },
                            { label: <IconList />, value: "table" },
                        ]}
                    />
                </Group>
                <ScrollArea style={{ height: "700px" }} offsetScrollbars>
                    {view === "table" ? (
                        <SchoolTable headers={["Name", "Address", "State", "Copies", "Actions"]} data={schools} />
                    ) : (
                        <SchoolGrid data={schools} />
                    )}
                </ScrollArea>
            </Stack>
        </>
    );
};

export default Home;
