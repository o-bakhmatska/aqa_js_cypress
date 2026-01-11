// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('loginAsGuest', () => {
  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });
});

import LoginModal from '../pages/loginModal';

Cypress.Commands.add('loginAsRegisteredUser', (email, password) => {

  cy.visit('https://qauto.forstudy.space/', {
    auth: {
      username: 'guest',
      password: 'welcome2qauto'
    }
  });

  LoginModal.open();
  LoginModal.fillEmail('101test101@gmail.com'),
  LoginModal.fillPassword('Password1'),
  LoginModal.submit();
  cy.get('.sidebar', { timeout: 10000 }).should('be.visible');
  cy.url().should('include', '/garage');
});

Cypress.Commands.overwrite('type',(originalFn, subject, text, options = {}) => {
    if (options.sensitive) {
      return originalFn(subject, text, { ...options, log: false });
    }
    return originalFn(subject, text, options);
  }
);

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })