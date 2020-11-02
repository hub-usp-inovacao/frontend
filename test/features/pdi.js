describe("PDI", ()=> {
  beforeEach(() => {
    cy.visit('/inovacao');
    cy.wait(1000);
  })

  it("finds any pdi or nap", () => {
    cy.get("#display-data");
    cy.get("[data-cy=listEmpty]").should("not.exist");
  })

  it("should display CEPIDS after filtering", () => {
    cy.get("#cepids-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  })

  it("should display EMBRAPII after filtering", () => {
    cy.get("#embrapii-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  })

  it("should display NAPS after filtering", () => {
    cy.get("#nap-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  })

  it("should disable button click when pdi doesn't have a website", () => {
    cy.get("#search-bar").type("Núcleo de Pesquisa em Produtos Naturais e Sintéticos", { delay: 75 });
    cy.wait(1000)
    cy.get("#display-data .v-item-group").click()
    cy.get("#display-data button.white--text").should('be.disabled')
  });

  it("should display all pdi from butantã campus", () => {
    cy.get("#input-83").click();
    cy.get(".v-list-item__title").contains("Butantã").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });
})