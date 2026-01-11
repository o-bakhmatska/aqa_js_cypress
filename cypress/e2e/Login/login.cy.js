describe('Registration positive tests', () => {

    beforeEach(() => {
     cy.loginAsRegisteredUser();
    });

    it('Simple test', () => {
        it('Should display Garage title', () => {
          cy.find('h1').should('be.visible').and('have.text', 'Garage');
        });
});
});