describe('First tests in Cypress', () => {
  it('The Home Page successfully loads', () => {
    cy.visit('/');
    cy.get('#title').should('contain', 'UI Test Automation');
    cy.get('#title').should('contain.text', 'Playground');
    cy.get('.alert.alert-warning').should('be.visible');
  });
  it('Should navigate to Dynamic ID page', () => {
    cy.visit('/');
    cy.contains('a', 'Dynamic ID').click();
    cy.url().should('include', '/dynamicid');
    cy.contains('h3', 'Dynamic ID').should('be.visible');
  });
  
});