describe("Iniciativas", () => {
  beforeEach(() => {
    cy.visit("/iniciativas");
    cy.wait(2000);
  });

  it("should disable button click when iniciative doesn't have a website", () => {
    cy.get("#search-bar").type("Núcleo São Carlos", { delay: 75 });

    cy.wait(1000);

    cy.get("#display-data .v-item-group").click();

    cy.get("#display-data button.white--text").should("be.disabled");
  });
});
