import { camelToUnderline, objectPropertiesToUnderline } from "./convertPropertyName";
import { describe, it, expect } from "vitest";

describe("camelToUnderline", () => {
    it("should convert camel case to underline in between words", () => {
        expect(camelToUnderline("camelCase")).toBe("camel_case");
        expect(camelToUnderline("camelCaseCase")).toBe("camel_case_case");
    });
});

describe("objectPropertiesToUnderline", () => {
    it("should convert object properties to underline", () => {
        expect(objectPropertiesToUnderline({ firstName: "John", lastName: "Doe" })).toEqual({
            first_name: "John",
            last_name: "Doe",
        });
    });
});
