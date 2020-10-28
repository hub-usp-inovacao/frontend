describe("Compentências", () => {
  beforeEach(() => {
    cy.visit("/competencias");
  })

  it("finds an existent teacher", () => {
    cy.get("#search-bar").type("Alfredo Goldman");

    cy.get(".hidden-sm-and-down").contains("Alfredo Goldman")
  })
})
