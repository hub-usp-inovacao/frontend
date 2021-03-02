describe("Educação", () => {
  beforeEach(() => {
    cy.visit("/educacao");
  });

  it("display correctly innovation disciplines", () => {
    cy.get("#innovation-filter").click();

    cy.get("#display-data");
  });
});
