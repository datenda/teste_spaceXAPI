describe("LaunchPage", () => {
  it("displays launch details for a valid ID", () => {
    const launchId = "5eb87cd9ffd86e000604b32a";
    cy.visit(`launches/${launchId}`);
    cy.get("h1").should("exist");
    cy.get("p").should("exist");
  });
});
