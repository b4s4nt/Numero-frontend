import React from "react";
import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
/**
 * @vitest-environment jsdom
 */

vi.mock("axios");

describe("StudentFom Component", () => {
    describe("StudentFom render", () => {
        it("should render correctly(ADD)", () => {
            render(<StudentForm type="add" />);
            // INPUTS
            expect(screen.getByLabelText("First Name")).toBeTruthy();
            expect(screen.getByLabelText("Last Name")).toBeTruthy();
            expect(screen.getByLabelText("Student ID")).toBeTruthy();
            expect(screen.getByLabelText("Password")).toBeTruthy();
            expect(screen.getByLabelText("Class")).toBeTruthy();

            // BUTTONS
            expect(screen.getByText("Add Student")).toBeTruthy();
            expect(screen.getByText("Discard Changes")).toBeTruthy();
        });
        it("should render correctly(EDIT)", () => {
            render(<StudentForm type="edit" studentId={1} />);
            // INPUTS
            expect(screen.getByLabelText("First Name")).toBeTruthy();
            expect(screen.getByLabelText("Last Name")).toBeTruthy();
            expect(screen.getByLabelText("Student ID")).toBeTruthy();

            expect(screen.queryByLabelText("Password")).toBeNull();

            expect(screen.getByLabelText("Class")).toBeTruthy();

            // BUTTONS
            expect(screen.getByText("Save Changes")).toBeTruthy();
            expect(screen.getByText("Discard Changes")).toBeTruthy();
        });
    });

    describe("StudentForm inputs", () => {
        it("should submit correctly(ADD)", async () => {
            render(<StudentForm type="add" />);
            // INPUTS
            const firstNameInput = screen.getByLabelText("First Name") as HTMLInputElement;
            const lastNameInput = screen.getByLabelText("Last Name") as HTMLInputElement;
            const studentIdInput = screen.getByLabelText("Student ID") as HTMLInputElement;
            const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;
            const classInput = screen.getByLabelText("Class") as HTMLInputElement;

            // INPUTS
            fireEvent.change(firstNameInput, { target: { value: "John" } });
            fireEvent.change(lastNameInput, { target: { value: "Doe" } });
            fireEvent.change(studentIdInput, { target: { value: "123456" } });
            fireEvent.change(passwordInput, { target: { value: "123456" } });
            fireEvent.change(classInput, { target: { value: "4A" } });

            // VALUES
            expect(firstNameInput.value).toBe("John");
            expect(lastNameInput.value).toBe("Doe");
            expect(studentIdInput.value).toBe("123456");
            expect(passwordInput.value).toBe("123456");
            expect(classInput.value).toBe("4A");

            // fireEvent.click(screen.getByText("Add Student"));
            // // const submitButton = screen.getByText("Add Student");
            // // const discardButton = screen.getByText("Discard Changes");
            // // submitButton.click();
        });
    });
});
describe("TeacherForm Component", () => {
    describe("TeacherForm render", () => {
        it("should render correctly(ADD)", () => {
            render(<TeacherForm type="add" teacherId={1} />);
            // INPUTS
            expect(screen.getByLabelText("First Name")).toBeTruthy();
            expect(screen.getByLabelText("Last Name")).toBeTruthy();
            expect(screen.getByLabelText("Email")).toBeTruthy();
            expect(screen.getByLabelText("Phone Number")).toBeTruthy();

            // BUTTONS
            expect(screen.getByText("Add Teacher")).toBeTruthy();
            expect(screen.getByText("Discard Changes")).toBeTruthy();
        });
        it("should render correctly(EDIT)", () => {
            render(<TeacherForm type="edit" teacherId={1} />);
            // INPUTS
            expect(screen.getByLabelText("First Name")).toBeTruthy();
            expect(screen.getByLabelText("Last Name")).toBeTruthy();
            expect(screen.getByLabelText("Email")).toBeTruthy();
            expect(screen.getByLabelText("Phone Number")).toBeTruthy();

            // BUTTONS
            expect(screen.getByText("Save Changes")).toBeTruthy();
            expect(screen.getByText("Discard Changes")).toBeTruthy();
        });
    });

    describe("StudentForm inputs", () => {
        it("should submit correctly(ADD)", async () => {
            render(<TeacherForm type="add" teacherId={1} />);
            // INPUTS
            const firstNameInput = screen.getByLabelText("First Name") as HTMLInputElement;
            const lastNameInput = screen.getByLabelText("Last Name") as HTMLInputElement;
            const emailInput = screen.getByLabelText("Email") as HTMLInputElement;
            const phoneNumberInput = screen.getByLabelText("Phone Number") as HTMLInputElement;

            // INPUTS
            fireEvent.change(firstNameInput, { target: { value: "John" } });
            fireEvent.change(lastNameInput, { target: { value: "Doe" } });
            fireEvent.change(emailInput, { target: { value: "123@gmail.com" } });
            fireEvent.change(phoneNumberInput, { target: { value: "0400000000" } });

            // VALUES
            expect(firstNameInput.value).toBe("John");
            expect(lastNameInput.value).toBe("Doe");
            expect(emailInput.value).toBe("123@gmail.com");
            expect(phoneNumberInput.value).toBe("0400000000");
        });
    });
});
