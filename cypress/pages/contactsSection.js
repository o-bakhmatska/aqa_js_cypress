class ContactsSection {
    get root() {
      return cy.get('#contactsSection');
    }
    get title() {
      return this.root.contains('h2', 'Contacts');
    }
  
    get hillelLink() {
      return this.root.get('a[href="https://ithillel.ua"]');
    }
    
    clickHillel() {
      this.hillelLink.invoke('removeAttr', 'target').click();
    }
   }
  
  export default new ContactsSection();
  