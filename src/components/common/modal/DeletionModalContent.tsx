// REACT IMPORTS
import { useEffect, useState } from "react";

// NEXT IMPORTS

// COMPONENT IMPORTS
import TeacherForm from "../form/TeacherForm";
import StudentForm from "../form/StudentForm";
import ClassForm from "../form/ClassForm";

// MANTINE IMPORTS
import { Title, Stack, Group, Image, Text } from "@mantine/core";
import { openModal } from "@mantine/modals";

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS
import DeleteImage from "../../../images/school/school-delete.png";

interface Props {
    type: "clearClass" | "clearStudent" | "delTeacher";
    itemId: number;
    schoolId?: string;
}

export const handleClearStudentData = (id: number) => {
    console.log("🚀 TCL ~ file: DeletionModalContent.tsx:35 ~ handleClearStudentData ~ id", id);
    openModal({
        title: <DeletionTitle type={"clearStudent"} />,
        children: <DeletionModalContent type={"clearStudent"} itemId={id} />,
    });
};

export const handleClearClassData = (id: any) => {
    openModal({
        title: <DeletionTitle type={"clearClass"} />,
        children: <DeletionModalContent type={"clearClass"} itemId={id} />,
    });
};

export const handleDeleteTeacher = (id: number) => {
    openModal({
        title: <DeletionTitle type={"delTeacher"} />,
        children: <DeletionModalContent type={"delTeacher"} itemId={id} />,
    });
};

const DeletionModalContent = ({ type, itemId }: Props) => {
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case "clearClass":
            case "clearStudent":
                setTitle("Clear This Data");
                break;
            case "delTeacher":
                setTitle("delete this teacher");
                break;
        }
    }, []);

    return (
        <>
            {type === "delTeacher" && <TeacherForm type="delete" teacherId={itemId} />}
            {type === "clearStudent" && <StudentForm type="clear" studentId={itemId} />}
            {type === "clearClass" && <ClassForm classId={`${itemId}`} />}
        </>
    );
};

export default DeletionModalContent;

export function DeletionTitle({ type }: any) {
    const [title, setTitle] = useState<string>("");

    useEffect(() => {
        switch (type) {
            case "clearClass":
            case "clearStudent":
                setTitle("Clear This Data");
                break;
            case "delTeacher":
                setTitle("delete this teacher");
                break;
        }
    }, []);

    return (
        <Group noWrap>
            <Image withPlaceholder src={DeleteImage} height={150} width={150} />

            <Stack spacing={0}>
                <Title order={5}>Are you sure you want to</Title>
                <Group spacing={0}>
                    <Title order={5} color={"red"}>
                        {title}
                    </Title>
                    <Title order={5}>?</Title>
                </Group>
                {type !== "delTeacher" ? (
                    <Text size={"md"}>
                        This action will clear the entire data of this {type === "clearClass" ? "class" : "student"}.
                    </Text>
                ) : null}
            </Stack>
        </Group>
    );
}
