class RegistrationModal {
    get modal() {
      return cy.get('app-signup-modal');
    }
  
    get title() {
      return this.modal.find('h4.modal-title');
    }
  
    get nameInput() {
      return this.modal.find('input[name="name"]');
    }
  
    get lastNameInput() {
      return this.modal.find('input[name="lastName"]');
    }
  
    get emailInput() {
      return this.modal.find('input[name="email"]');
    }
  
    get passwordInput() {
      return this.modal.find('input[name="password"]');
    }
  
    get repeatPasswordInput() {
      return this.modal.find('input[name="repeatPassword"]');
    }
  
    get registerButton() {
      return this.modal.contains('button', 'Register');
    }

    get closeIcon() {
        return this.modal.find('button.close, .modal-header button'); 
      }
    
      close() {
        this.closeIcon.click();
      }
  
    error(text) {
      return this.modal.contains(text);
    }

    fillForm({ name, lastName, email, password, repeatPassword }) {
        if (name) this.nameInput.clear().type(name);
        if (lastName) this.lastNameInput.clear().type(lastName);
        if (email) this.emailInput.clear().type(email);
        if (password) this.passwordInput.clear().type(password);
        if (repeatPassword) this.repeatPasswordInput.clear().type(repeatPassword);
      }
  }
  
  export default new RegistrationModal();
  