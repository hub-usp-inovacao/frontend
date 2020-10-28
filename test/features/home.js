describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the main headline", () => {
    cy.contains("Portal Solus");
  })
});
