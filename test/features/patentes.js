describe("Patentes", () => {
  beforeEach(() => {
    cy.visit("/patentes");
    cy.wait(2000);
  })

  it("does not slices long inventors names", () => {
    cy.get("#search-bar").type("dispositivos pneumaticos", { delay: 75 });

    cy.wait(1000)

    cy.get("#display-data .v-item-group").click()

    cy
      .get("[data-cy=Inventores-bullet-list]")
      .get("[data-cy=bullet-item]").contains("Alexander Antônio Jaskulski")
  })
})
