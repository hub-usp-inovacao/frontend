describe("Compentências", () => {
  beforeEach(() => {
    cy.visit("/competencias");
  })

  it("finds an existent teacher", () => {
    const teacher = "Alfredo Goldman";
    cy.get("#search-bar").type(teacher);
    cy.wait(10000)
    cy.get("#display-data").contains(teacher)
  })
})
