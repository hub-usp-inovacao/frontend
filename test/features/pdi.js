describe("PDI", () => {
  beforeEach(() => {
    cy.visit("/inovacao");
    cy.wait(1000);
  });

  it("finds any pdi or nap", () => {
    cy.get("#display-data");
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });

  it("should display CEPID after filtering", () => {
    cy.get("#cepid-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });

  it("should display EMBRAPII after filtering", () => {
    cy.get("#embrapii-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });

  it("should display NAPS after filtering", () => {
    cy.get("#nap-filter").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });

  it("should disable button click when pdi doesn't have a website", () => {
    cy.get("#search-bar").type(
      "Núcleo de Pesquisa em Produtos Naturais e Sintéticos",
      {
        delay: 75,
      }
    );
    cy.wait(1000);
    cy.get("#display-data .v-item-group").click();
    cy.get("#display-data button.white--text").should("be.disabled");
  });

  it("should display all pdi from São Paulo campus", () => {
    cy.get("[data-cy=dropdownFilter]").click().type("São Paulo");
    cy.get(".v-list-item__title").contains("São Paulo").click();
    cy.get("[data-cy=listEmpty]").should("not.exist");
  });
});
