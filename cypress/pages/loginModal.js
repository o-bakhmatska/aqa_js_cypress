class LoginModal {
    get modal() {
      return cy.get('app-signin-modal');
    }
  
    get emailInput() {
      return this.modal.find('input[name="email"]');
    }
  
    get passwordInput() {
      return this.modal.find('input[name="password"]');
    }
  
    get loginButton() {
      return this.modal.contains('button', 'Login');
    }
  
    open() {
      cy.contains('button', 'Sign In').click();
      this.modal.should('be.visible');
    }
  
    fillEmail(email) {
      this.emailInput.clear().type(email);
    }
  
    fillPassword(password) {
      this.passwordInput.clear().type(password, { sensitive: true });
    }
  
    submit() {
      this.loginButton.click();
    }
  }
  
  export default new LoginModal();
  