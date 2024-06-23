// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS
import TeacherForm from "../form/TeacherForm";

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    type: "add" | "edit";
    teacherId?: number;
}

const TeacherModalContent = ({ type, teacherId }: Props) => {
    return (
        <>
            <TeacherForm teacherId={teacherId} type={type} />
        </>
    );
};

export default TeacherModalContent;
