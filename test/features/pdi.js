describe("PDI", ()=> {
    beforeEach(() => {
        cy.visit('/inovacao');
    })

    it ("finds any pdi or nap", () => {
        const emptyMessage = "Não encontramos nada relacionado à sua pesquisa";
        cy.get("#display-data");
        cy.wait(1000);
        cy.get("[data-cy=listEmpty]").should("not.exist");
    })
})