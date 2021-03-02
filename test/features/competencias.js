describe("Compentências", () => {
  beforeEach(() => {
    cy.visit("/competencias");
  });

  it("finds an existent teacher", () => {
    const teacher = "Alfredo Goldman";
    cy.get("#search-bar").type(teacher);
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });

  it("should disable button click when teacher doesn't have a website", () => {
    cy.get("#search-bar").type("Rafael Francisco Lia Mondelli", { delay: 75 });

    cy.wait(1000);

    cy.get("#display-data .v-item-group").click();

    cy.get("#display-data button.white--text").should("be.disabled");
  });
});
