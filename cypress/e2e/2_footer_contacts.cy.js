import ContactsSection from '../pages/contactsSection';

describe('Contacts and Footer Tests', () => {
  beforeEach(() => {
    cy.loginAsGuest();
  });

  it('Contacts section should be visible', () => {
    ContactsSection.root.should('be.visible');
  });

  it('Should display Contacts title', () => {
    ContactsSection.title.should('be.visible');
  });

  it('Should contain ithillel.ua link', () => {
    ContactsSection.hillelLink
      .should('be.visible')
      .and('contain.text', 'ithillel.ua')
      .and('have.attr', 'href', 'https://ithillel.ua');
  });

  it('Should navigate to ithillel.ua when clicking link in footer', () => {
    ContactsSection.clickHillel();
    cy.url().should('include', 'ithillel.ua');
  });
});
