export const pageRoutes: { [key: string]: any } = {
    // AUTH
    HOME: "/",
    LOGIN: "/auth/signin",
    SIGNUP: (id: string) => `/auth/signup/${id}`,
    RESET_PASSWORD: (token: string) => `/auth/reset-password/${token}`,
    FORGOT_PASSWORD: "/auth/forgot-password",

    // JULIE / ROOT ADMIN
    ADMIN_DASHBOARD: "/admin/dashboard",
    ADMIN_ADD_SCHOOL: "/admin/addschool",

    // SCHOOL ADMIN
    SCHOOL_DASHBOARD: (id: string) => `/school/${id}`,
    SCHOOL_PAGE: (id: string, link: string) => `/school/${id}/${link}`,

    SCHOOL_STUDENTS: (id: string) => `/school/${id}/students`,

    SCHOOL_CLASSES: (id: string) => `/school/${id}/classes`,
    SCHOOL_CLASSES_ADD: (id: string) => `/school/${id}/classes/add`,
    SCHOOL_CLASSES_EDIT: (id: string, classId: string) => `/school/${id}/classes/edit/${classId}`,

    SCHOOL_TEACHERS: (id: string) => `/school/${id}/teachers`,
    SCHOOL_DETAILS: (id: string) => `/school/${id}/details`,
};

// navigate(pageRoutes.SCHOOL_DASHBOARD(schoolId))
export const protectedRoutes = [pageRoutes.ADMIN_DASHBOARD, pageRoutes.ADMIN_ADD_SCHOOL];
