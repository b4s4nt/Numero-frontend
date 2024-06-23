// REACT IMPORTS

import { createBrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "../../../pages/404/404.page";
import ForgotPasswordPage from "../../../pages/auth/password/ForgotPassword";
import ResetPasswordPage from "../../../pages/auth/password/ResetPassword.page";
import SigninPage from "../../../pages/auth/signin/Signin.page";
import SignupPage from "../../../pages/auth/signup/Signup.page";
import AdminHomePage from "../../../pages/home/Admin.Home.page";
import SchoolHomePage from "../../../pages/home/School.Home.page";
import AddClassesPage from "../../../pages/school/Classes/AddClass.page";
import EditClassesPage from "../../../pages/school/Classes/EditClass.page";
import SchoolClassesPage from "../../../pages/school/School.Classes.page";
import SchoolDetailsPage from "../../../pages/school/School.Details.page";
import SchoolReportsPage from "../../../pages/school/School.Reports.page";
import SchoolResourcesPage from "../../../pages/school/School.Resources.page";
import SchoolStudentPage from "../../../pages/school/School.Students.page";
import SchoolTeachersPage from "../../../pages/school/School.Teachers.page";
import AddSchoolPage from "../../../pages/school/Schools/AddSchool";
import NotFound from "../404/404";
import Dashboard from "../dashboard/Dashboard";

// NEXT IMPORTS

// COMPONENT IMPORTS

// MANTINE IMPORTS

// NETWORK IMPORTS

// TYPE IMPORTS

// FUNCTION IMPORTS

// STYLE IMPORTS

interface Props {}

const FileRoutes = (props: Props) => {
    // NOT USING THIS COMPONENT ANYMORE
    return (
        <Routes>
            <Route path={"*"} element={<NotFoundPage />} />
            <Route path={"/404"} element={<NotFoundPage />} />

            <Route path={"julie"} element={<Dashboard />}>
                <Route path={"dashboard"} element={<AdminHomePage />} />
            </Route>

            <Route path={"admin"} element={<Dashboard />}>
                <Route path={"dashboard"} element={<AdminHomePage />} />
            </Route>

            <Route path={"school"} element={<Dashboard />}>
                <Route path={":schoolId"} element={<SchoolHomePage />} />
                <Route path={":schoolId/students"} element={<SchoolStudentPage />} />
                <Route path={":schoolId/students/:studentId"} element={<SchoolHomePage />} />
                <Route path={":schoolId/classes"} element={<SchoolClassesPage />} />
                <Route path={":schoolId/classes/add"} element={<AddClassesPage />} />
                <Route path={":schoolId/classes/edit/:name"} element={<EditClassesPage />} />
                <Route path={":schoolId/teachers"} element={<SchoolTeachersPage />} />
                <Route path={":schoolId/teachers/:teacherId"} element={<SchoolHomePage />} />
                <Route path={":schoolId/details"} element={<SchoolDetailsPage />} />
                <Route path={":schoolId/reports"} element={<SchoolReportsPage />} />
            </Route>

            <Route path={"/"}>
                <Route index element={<SigninPage />} />
                <Route path={"signup/:schoolId"} element={<SignupPage />} />
                <Route path={"signin"} element={<SigninPage />} />
            </Route>
        </Routes>
    );
};

const routes = [
    {
        path: "/",
        children: [
            {
                index: true,
                element: <SigninPage />,
            },
            {
                path: "auth",
                children: [
                    {
                        index: true,
                        element: <SigninPage />,
                    },
                    {
                        path: "signin/",
                        element: <SigninPage />,
                    },
                    {
                        path: "signup/:schoolId",
                        element: <SignupPage />,
                    },
                    {
                        path: "reset-password/:token",
                        element: <ResetPasswordPage />,
                    },
                    {
                        path: "forgot-password",
                        element: <ForgotPasswordPage />,
                    },
                ],
            },

            {
                path: "julie",
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <AdminHomePage />,
                    },
                    {
                        path: "dashboard",
                        element: <AdminHomePage />,
                    },
                    {
                        path: "addschool",
                        element: <AddSchoolPage />,
                    },
                ],
            },
            {
                path: "admin",
                element: <Dashboard />,
                children: [
                    {
                        index: true,
                        element: <AdminHomePage />,
                    },
                    {
                        path: "dashboard",
                        element: <AdminHomePage />,
                    },
                    {
                        path: "addSchool",
                        element: <AddSchoolPage />,
                    },
                ],
            },
            {
                path: "school",
                element: <Dashboard />,
                children: [
                    {
                        path: ":schoolId",
                        element: <SchoolHomePage />,
                    },
                    {
                        path: ":schoolId/students",
                        element: <SchoolStudentPage />,
                    },
                    {
                        path: ":schoolId/students/:studentId",
                        element: <SchoolHomePage />,
                    },
                    {
                        path: ":schoolId/classes",
                        element: <SchoolClassesPage />,
                    },
                    {
                        path: ":schoolId/classes/add",
                        element: <AddClassesPage />,
                    },
                    {
                        path: ":schoolId/classes/edit/:name",
                        element: <EditClassesPage />,
                    },
                    {
                        path: ":schoolId/teachers",
                        element: <SchoolTeachersPage />,
                    },
                    {
                        path: ":schoolId/teachers/:teacherId",
                        element: <SchoolHomePage />,
                    },
                    {
                        path: ":schoolId/details",
                        element: <SchoolDetailsPage />,
                    },
                    {
                        path: ":schoolId/reports",
                        element: <SchoolReportsPage />,
                    },
                    {
                        path: ":schoolId/resources",
                        element: <SchoolResourcesPage />,
                    },
                ],
            },
            {
                path: "*", // 404
                element: <NotFoundPage />,
            },
        ],
    },
];

export const router = createBrowserRouter(routes);

export default FileRoutes;
