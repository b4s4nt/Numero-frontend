describe("Student Page", () => {
    it("should show the student page", () => {
        cy.visit("http://school.numero.test:5173/school/5/students");

        cy.contains("student");
        cy.contains("Add Student").click();

        cy.contains("Add A New Student");

        cy.get('[data-cy="firstName"]').type("John").should("have.value", "John");
        cy.get('[data-cy="lastName"]').type("Doe").should("have.value", "Doe");
        cy.get('[data-cy="studentId"]').type("ABC123").should("have.value", "ABC123");

        cy.get('[data-cy="classId"]').click();
        cy.get(".mantine-Select-item:first-of-type").click();

        cy.get('[data-cy="submit"]').click();

        cy.get("table").within(() => {
            cy.contains("John");
            cy.contains("Doe");
            cy.contains("ABC123");
            cy.contains("4A");
            cy.contains("Active");

            cy.get(".mantine-ActionIcon-root").last().click();

            cy.get(".mantine-Menu-dropdown").within(() => {
                cy.contains("Edit Student");
                cy.contains("Move Student");
                cy.contains("Clear Data").click();
            });
        });

        cy.contains("Clear This Data");
        cy.contains("Yes, Clear Data").click();
    });
});

export {};
