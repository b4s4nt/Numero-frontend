export interface Student {
    [key: string]: any;
    id: number;
    schoolId: number;
    studentId: string;
    classId: number;
    className: string;
    firstName: string;
    lastName: string;
    year?: number;
    room?: string;
    active: boolean | 0 | 1;
}
