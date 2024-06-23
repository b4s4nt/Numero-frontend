// REACT IMPORTS

// NEXT IMPORTS

// COMPONENT IMPORTS
import StudentForm from "../form/StudentForm";

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {
    type: "add" | "edit" | "move";
    studentId?: number;
}

const StudentContent = ({ type, studentId }: Props) => {
    let title = "";
    switch (type) {
        case "add":
            title = "Add A New Student";
            break;
        case "edit":
            title = "Edit Student";
            break;
        case "move":
            title = "Move A Student";
            break;
        default:
            title = "";
    }

    return (
        <>
            <StudentForm type={type} studentId={studentId} />
        </>
    );
};

export default StudentContent;
