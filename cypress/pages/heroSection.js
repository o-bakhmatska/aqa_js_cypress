class HeroSection {
    get singUpButton() {
      return cy.contains('button', 'Sign up');
    }
  
    clickSingUpButton() {
      this.singUpButton.click();
    }
  }
  
  export default new HeroSection();
  