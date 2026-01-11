import RegistrationModal from '../../pages/registrationModal';
import HeroSection from '../../pages/heroSection';
import * as ERROR_MESSAGE from '../../constants/errorMessages';

describe('Registration popup validation tests', () => {

  beforeEach(() => {
    cy.loginAsGuest();
    HeroSection.clickSingUpButton();
    RegistrationModal.modal.should('be.visible');
  });

  afterEach(() => {
    RegistrationModal.close();
    RegistrationModal.modal.should('not.exist');
  });

  it('Should display Registration title', () => {
    RegistrationModal.title.should('be.visible').and('have.text', 'Registration');
  });

  it('Validate on required values for all fields', () => {
    const requiredFields = [
      { field: 'nameInput', error: ERROR_MESSAGE.NAME_REQUIRED},
      { field: 'lastNameInput', error: ERROR_MESSAGE.LAST_NAME_REQUIRED },
      { field: 'emailInput', error: ERROR_MESSAGE.EMAIL_REQUIRED  },
      { field: 'passwordInput', error: ERROR_MESSAGE.PASSWORD_REQUIRED },
      { field: 'repeatPasswordInput', error: ERROR_MESSAGE.RE_ENTER_PASSWORD_REQUIRED}
    ];
    requiredFields.forEach(({ field, error }) => {
      RegistrationModal[field].click();
      RegistrationModal.title.click();
      RegistrationModal.error(error).should('be.visible');
      RegistrationModal[field].should('have.css', 'border-color', 'rgb(220, 53, 69)');
    });
    RegistrationModal.registerButton.should('be.disabled');
  });

  it('Validate Name and Last name for invalid text', () => {
    const fieldsWithSpaces = [
      {
        input: 'nameInput',
        invalidValues:  ['Ok sa na', 'Оксана', 12345, 'ok-sa*na', '@123Qwe'], 
        valid: 'Ok',
        error: ERROR_MESSAGE.INVALID_NAME
      },
      {
        input: 'lastNameInput',
        invalidValues: ['Bak h ma tska', 'Бахмацька', 12345, 'ok-sa*na', '@123Qwe'],
        valid: 'Ba',
        error: ERROR_MESSAGE.INVALID_LAST_NAME
      }
    ];
    fieldsWithSpaces.forEach(({ input, invalidValues, valid, error }) => {
      invalidValues.forEach((invalid) => {
        RegistrationModal[input].clear().type(invalid);
        RegistrationModal.title.click();
        RegistrationModal.error(error).should('be.visible');
        RegistrationModal[input].should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
      RegistrationModal[input].clear().type(valid);
      RegistrationModal.title.click();
      RegistrationModal.error(error).should('not.exist');
      RegistrationModal[input].should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
    });
    RegistrationModal.registerButton.should('be.disabled');
  });

  it('Validate Name and Last Name length using boundary values and equivalence classes', () => {
    const fields = [
      {
        input: 'nameInput',
        error: ERROR_MESSAGE.NAME_ERROR
      },
      {
        input: 'lastNameInput',
        error: ERROR_MESSAGE.LAST_NAME_ERROR
      }
    ];
  
    const testValues = [
      { value: 'A', valid: false },                 
      { value: 'Ab', valid: true },                     
      { value: 'A'.repeat(20), valid: true },           
      { value: 'A'.repeat(21), valid: false }            
    ];
  
    fields.forEach(({ input, error }) => {
      testValues.forEach(({ value, valid }) => {
        RegistrationModal[input].clear().type(value);
        RegistrationModal.title.click();
  
        if (valid) {
          RegistrationModal.error(error).should('not.exist');
          RegistrationModal[input].should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
        } else {
          RegistrationModal.error(error).should('be.visible');
          RegistrationModal[input].should('have.css', 'border-color', 'rgb(220, 53, 69)');
        }
      });
    });
    RegistrationModal.registerButton.should('be.disabled');
  });
  
  it('Validate all fields together', () => {
    const fields = [
      {
        input: 'nameInput',
        invalid: 'A',
        valid: 'Anna',
        error: ERROR_MESSAGE.NAME_ERROR
      },
      {
        input: 'lastNameInput',
        invalid: 'B',
        valid: 'Berner',
        error: ERROR_MESSAGE.LAST_NAME_ERROR
      },
      {
        input: 'emailInput',
        invalid: 'test@@mail.com',
        valid: 'valid.email@test.com',
        error: ERROR_MESSAGE.INCORRECT_EMAIL
      },
      {
        input: 'passwordInput',
        invalid: 'password',
        valid: 'Password1',
        error: ERROR_MESSAGE.PASSWORD_ERROR
      },
      {
        input: 'repeatPasswordInput',
        invalid: 'Password2',
        valid: 'Password1',
        error: ERROR_MESSAGE.PASSWORD_DO_NOT_MATCH
      }
    ];
  
    fields.forEach(({ input, invalid, valid, error }) => {

      RegistrationModal[input].clear().type(invalid);
      RegistrationModal.title.click();
      RegistrationModal.error(error).should('be.visible');
      RegistrationModal[input].should('have.css', 'border-color', 'rgb(220, 53, 69)');
      RegistrationModal[input].clear().type(valid);
      RegistrationModal.title.click();
      RegistrationModal.error(error).should('not.exist');
      RegistrationModal[input].should('have.css', 'border-color').and('not.eq', 'rgb(220, 53, 69)');
    });
    RegistrationModal.registerButton.should('be.enabled');
  });

  it('Validate email filed for multiple invalid email formats', () => {
    const invalidEmails = [
      'test@@mail.com',
      'test@mail..com',
      'test@ma!l.com',
      'test@mail',
      'test.mail.com',
      'test@.com',
      'test@com.',
      'wrong-email'
    ];
  
    invalidEmails.forEach((email) => {
      RegistrationModal.emailInput.clear().type(email);
      RegistrationModal.title.click();
      RegistrationModal.error(ERROR_MESSAGE.INCORRECT_EMAIL).should('be.visible');
      RegistrationModal.emailInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      RegistrationModal.registerButton.should('be.disabled');
    });
  });
  
  it('Validate password field for multiple invalid password formats', () => {

    const invalidPasswords = [
      'short1A',        // < 8 characters
      'alllowercase1',  // no capital letter
      'ALLUPPERCASE1',  // no small letter
      'NoNumberPass',   // no digit
      'password',       // no digit, no capital
      'PASSWORD1',      // no small letter
      'Pass1',          // too short
      'VeryLongPassword123' // > 15 characters
    ];
  
    invalidPasswords.forEach((password) => {
      RegistrationModal.passwordInput.clear().type(password);
      RegistrationModal.title.click();
      RegistrationModal.error(ERROR_MESSAGE.PASSWORD_ERROR).should('be.visible');
      RegistrationModal.passwordInput.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      RegistrationModal.registerButton.should('be.disabled');
    });
  });
});
