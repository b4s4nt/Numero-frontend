import { camelize, revertCamelCase, capFirstLetterOfEachWord } from "./helpers";
import { describe, it, expect } from "vitest";

describe("camelize", () => {
    it("should convert a string to camelCase", () => {
        expect(camelize("camel case case")).toBe("camelCaseCase");
        expect(camelize("Camel Case")).toBe("camelCase");
        expect(camelize("Camel-case")).toBe("camelCase");
        expect(camelize("camel_case")).toBe("camelCase");
    });
});

describe("revertCamelCase", () => {
    it("should convert a camelCase string to a string with spaces", () => {
        expect(revertCamelCase("camelCase")).toBe("camel case");
        expect(revertCamelCase("camelCaseCase")).toBe("camel case case");
    });
});

describe("capFirstLetterOfEachWord", () => {
    it("should capitalize the first letter of each word in a string", () => {
        expect(capFirstLetterOfEachWord("camel case")).toBe("Camel Case");
        expect(capFirstLetterOfEachWord("camel case case")).toBe("Camel Case Case");
    });
});
