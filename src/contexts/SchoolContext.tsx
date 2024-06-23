import { createContext, useEffect, useState } from "react";
import { Navigate, redirect, useMatches, useNavigate, useParams } from "react-router-dom";
import { Class } from "../interfaces/Class";
import { School } from "../interfaces/School";
import { Student } from "../interfaces/Student";
import { Teacher } from "../interfaces/Teacher";
import ListClasses from "../networking/api/Class/ListClasses";
import ViewSchool from "../networking/api/School/ViewSchool";
import ListStudents from "../networking/api/Student/ListStudent";
import ListTeachers from "../networking/api/Teacher/ListTeacher";

interface SchoolContext {
    children: React.ReactNode;
}

interface SchoolContextType {
    schoolId: string | undefined;
    school: School;
    fetchSchool: (schoolId: string) => void;
    classes: Class[];
    fetchClasses: (schoolId: string) => void;
    teachers: Teacher[];
    fetchTeachers: (schoolId: string) => void;
    students: Student[];
    fetchStudents: (schoolId: string) => void;
}

export const SchoolContext = createContext<SchoolContextType>({
    schoolId: "",
    school: {} as School,
    fetchSchool: () => {},
    classes: [] as Class[],
    fetchClasses: () => {},
    teachers: [] as Teacher[],
    fetchTeachers: () => {},
    students: [] as Student[],
    fetchStudents: () => {},
});

export const SchoolContextProvider = ({ children }: SchoolContext) => {
    const { schoolId } = useParams<any>();
    const [school, setSchool] = useState<School>({} as School);
    const [classes, setClasses] = useState<Class[]>([] as Class[]);
    const [teachers, setTeachers] = useState<Teacher[]>([] as Teacher[]);
    const [students, setStudents] = useState<Student[]>([] as Student[]);

    const navigate = useNavigate();

    async function fetchSchool(schoolId: string) {
        if (!schoolId) return;

        const req = new ViewSchool(schoolId);
        const res = await req.fetch();

        if (res.success) {
            setSchool(res.data);
        } else {
            // navigate("/404");
            console.error(res.message);
        }
    }

    async function fetchClasses(schoolId: string) {
        if (!schoolId) return;
        const req = new ListClasses(schoolId);
        const res = await req.fetch();

        if (res.success) {
            setClasses(res.data.data);
        } else {
            console.log(res.message);
        }
    }

    async function fetchTeachers(schoolId: string) {
        if (!schoolId) return;
        const req = new ListTeachers(schoolId);
        const res = await req.fetch();

        if (res.success) {
            console.log("Teachers: ", res.data.data);
            setTeachers(
                res.data.data.map((teacher: any) => ({
                    id: teacher.id,
                    firstName: teacher.first_name,
                    lastName: teacher.last_name,
                    email: teacher.email,
                    phone: teacher.phone,
                }))
            );
        } else {
            console.log(res.message);
        }
    }

    async function fetchStudents(schoolId: string) {
        if (!schoolId) return;
        const req = new ListStudents(schoolId);
        const res = await req.fetch();

        if (res.success) {
            if (res.data.length === 0) return;

            const newStudents = res.data.data.map((student: any) => ({
                id: student.id,
                firstName: student.first_name,
                lastName: student.last_name,
                studentId: student.student_id,
                classId: student.class_id,
                active: student.is_active === 1 ? true : false,
            }));

            setStudents(newStudents);
        } else {
            console.log(res.message);
        }
    }

    useEffect(() => {
        if (!schoolId) return;

        fetchSchool(schoolId);
        fetchClasses(schoolId);
        fetchTeachers(schoolId);
        fetchStudents(schoolId);
    }, [schoolId]);

    useEffect(() => {
        if (classes.length > 0 && teachers.length > 0) {
            // put teachers in classes
            const newClasses = classes.map((schoolClass: any) => {
                schoolClass.teachers = {} as Teacher;
                schoolClass.teacher = teachers.filter((teacher: any) => teacher.id === schoolClass.teacher_id);
                return schoolClass;
            });
            setClasses(newClasses);
        }
    }, [teachers]);

    useEffect(() => {
        if (classes.length > 0 && students.length > 0) {
            // put students in classes
            const newClasses = classes.map((schoolClass: any) => {
                schoolClass.students = [];
                schoolClass.students = students.filter((student: any) => student.classId === schoolClass.id);
                return schoolClass;
            });
            setClasses(newClasses);
        }
    }, [students]);

    return (
        <SchoolContext.Provider
            value={{
                schoolId,
                school,
                fetchSchool,
                classes,
                fetchClasses,
                teachers,
                fetchTeachers,
                students,
                fetchStudents,
            }}
        >
            {children}
        </SchoolContext.Provider>
    );
};
