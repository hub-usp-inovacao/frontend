describe("Accented search terms", () => {
  const tests = {
    "/empresas": "agência",
    "/educacao": "inovação",
    "/iniciativas": "gestão pública",
    "/competencias": "andré"
  };

  Object.keys(tests).forEach((page) => {
    it("finds accentuated words properly in " + page, () => {
      cy.visit(page);
      cy.wait(1000);
      cy.get("#search-bar").type(tests[page], { delay: 75 });
      cy.get("[data-cy=listEmpty]").should("not.exist");
    })
  })
})
