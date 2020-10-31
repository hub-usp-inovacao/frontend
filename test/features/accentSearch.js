describe("Accented search terms", () => {
  const tests = {
    "/empresas": "agência"
  };

  Object.keys(tests).forEach((page) => {
    it("finds accentuated words properly in " + page, () => {
      cy.visit(page);
      cy.get("#search-bar").type(tests[page], { delay: 75 });
      cy.get("[data-cy=listEmpty]").should("not.exist");
    })
  })
})
