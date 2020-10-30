describe("PDI", ()=> {
    beforeEach(() => {
        cy.visit('/inovacao');
        cy.wait(1000);
    })

    it ("finds any pdi or nap", () => {
        cy.get("#display-data");
        cy.get("[data-cy=listEmpty]").should("not.exist");
    })

    it ("should display CEPIDS after filtering", () => {
        cy.get("#cepids-filter").click();
        cy.get("[data-cy=listEmpty]").should("not.exist");
    })

    it ("should display EMBRAPII after filtering", () => {
        cy.get("#embrapii-filter").click();
        cy.get("[data-cy=listEmpty]").should("not.exist");
    })

    it ("should display NAPS after filtering", () => {
        cy.get("#nap-filter").click();
        cy.get("[data-cy=listEmpty]").should("not.exist");
    })
})