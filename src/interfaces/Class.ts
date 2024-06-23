import { Student } from "./Student";
import { Teacher } from "./Teacher";

export interface Class {
    [key: string]: any;
    schoolId: number;
    name: string;
    teacher: Teacher;
    students: Student[];
}

export const stubClassNames: string[] = [
    "4A",
    "4B",
    "4C",
    "4D",
    "5A",
    "5B",
    "5C",
    "5D",
    "6A",
    "6B",
    "6C",
    "6D",
    "7A",
    "7B",
    "7C",
    "7D",
];
