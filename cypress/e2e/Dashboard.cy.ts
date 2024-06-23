describe("Dashboard Page", () => {
    it("should show the dashboard", () => {
        cy.visit("http://school.numero.test:5173/school/5");

        cy.get("header").within(() => {
            cy.contains("Dashboard");
            cy.contains("Students");
            cy.contains("Classes");
            cy.contains("Teachers");
            cy.contains("Details");
            cy.contains("Logout");
        });

        cy.get(".mantine-AppShell-body").within(() => {
            cy.contains("Students");
            cy.contains("Classes");
            cy.contains("Teachers");
            cy.contains("School Details");
        });
    });
});

export {};
