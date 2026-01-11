import HeroSection from '../../pages/heroSection';

describe('Hero Section Tests', () => {
  beforeEach(() => {
    cy.loginAsGuest();
  });

  it('Button Sing Up should be visible', () => {
    HeroSection.singUpButton.should('be.visible');
  });

  it('Sing Up button should be clickable', () => {
    HeroSection.clickSingUpButton();
    cy.contains('Sing Up').should('not.exist');
  });

  it('Modal SingUp is opened by clicking on Sing Up button', () => {
    HeroSection.clickSingUpButton();
    cy.get('app-signup-modal').should('be.visible');
    cy.get('app-signup-modal')
      .find('h4.modal-title')
      .should('be.visible')
      .and('have.text', 'Registration');
  });
});

