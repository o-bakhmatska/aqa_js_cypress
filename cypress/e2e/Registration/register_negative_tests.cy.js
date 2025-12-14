import RegistrationModal from '../../pages/registrationModal';
import HeroSection from '../../pages/heroSection';
import * as ERROR_MESSAGE from '../../constants/errorMessages';

describe('Registration positive tests', () => {

  beforeEach(() => {
    cy.loginAsGuest();
    HeroSection.clickSingUpButton();

    RegistrationModal.modal.should('be.visible');
  });

  afterEach(() => {
    RegistrationModal.close();
    RegistrationModal.modal.should('not.exist');
  });
  
  it('Should not allow registration if user already exists', () => {
    RegistrationModal.fillForm({
      name: 'Test',
      lastName: 'TEST',
      email: 'test11@test.com',
      password: 'Password1',
      repeatPassword: 'Password1'
    });

    RegistrationModal.registerButton.click();

    RegistrationModal.error('User already exists')
      .should('be.visible');
  });

  it('Should not allow submit empty registration form', () => {
    RegistrationModal.registerButton.should('be.disabled');
  });

  it('Register button should be disabled if at least one field is invalid', () => {
    RegistrationModal.fillForm({
      name: 'John',
      lastName: 'Doe',
      email: 'wrong-email',
      password: 'Password1',
      repeatPassword: 'Password1'
    });

    RegistrationModal.registerButton.should('be.disabled');
  });

  it('Should not accept invalid password', () => {
    RegistrationModal.fillForm({
      password: 'password',
      repeatPassword: 'password'
    });

    RegistrationModal.error(ERROR_MESSAGE.PASSWORD_ERROR).should('be.visible');

    RegistrationModal.registerButton.should('be.disabled');
  });

  it('Should not allow registration if passwords do not match', () => {
    RegistrationModal.fillForm({
      password: 'Password1',
      repeatPassword: 'Password2'
    });
    RegistrationModal.title.click();
    RegistrationModal.error(ERROR_MESSAGE.PASSWORD_DO_NOT_MATCH).should('be.visible');
    RegistrationModal.registerButton.should('be.disabled');
  });
});  