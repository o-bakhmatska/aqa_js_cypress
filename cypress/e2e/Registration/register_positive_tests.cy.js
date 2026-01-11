import RegistrationModal from '../../pages/registrationModal';
import HeroSection from '../../pages/heroSection';

describe('Registration positive tests', () => {

  beforeEach(() => {
    cy.loginAsGuest();
    HeroSection.clickSingUpButton();

    RegistrationModal.modal.should('be.visible');
  });

  it('Should successfully register a new user', () => {
    const uniqueEmail = `user_${Date.now()}@test.com`;
  
    RegistrationModal.fillForm({
      name: 'Anna',
      lastName: 'Lee',
      email: uniqueEmail,
      password: 'Password1',
      repeatPassword: 'Password1'
    });
  
    RegistrationModal.registerButton
      .should('not.be.disabled')
      .click();
    
    RegistrationModal.modal.should('not.exist');
    cy.url().should('include', '/garage');
  });

});

