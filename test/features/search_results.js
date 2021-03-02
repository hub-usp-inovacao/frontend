describe("Global Search", () => {
  beforeEach(() => {
    cy.visit("/search_results");
  });

  it("should not show unrelated search results", () => {
    const searchTerms = ["Astronomia", "Oncologia"];
    const unrelatedResults = ["Artesanato", "Sonologia"];
    for (let i = 0; i < 2; i++) {
      cy.get("#search-bar").clear().type(searchTerms[i]).type("{enter}");
      cy.get(".v-card__text").should("not.contain", unrelatedResults[i]);
    }
  });
});
