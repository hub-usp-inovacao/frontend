describe("Compentências", () => {
  beforeEach(() => {
    cy.visit("/competencias");
  })

  it("finds an existent teacher", () => {
    const teacher = "Alfredo Goldman";
    cy.get("#search-bar").type(teacher);
    cy.wait(1000)
    cy.get("#display-data").contains(teacher)
  })
})
