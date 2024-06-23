import Button from "./Button";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

describe("Button", () => {
    it("should render correctly", () => {
        render(<Button label="test" />);
        expect(screen.getByText("test")).toBeTruthy();
    });

    it("should accept onclick fn", () => {
        const mockFn = vi.fn();
        render(<Button label="test" onClick={mockFn} />);
        screen.getByText("test").click();
        expect(mockFn).toHaveBeenCalled();
    });
});
