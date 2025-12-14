class ExpensesModal {

  get modal() {
    return cy.get('app-add-expense-modal');
  }

  get title() {
    return this.modal.find('h4.modal-title');
  }

  get carSelect() {
    return this.modal.find('#addExpenseCar');
  }

  get mileageInput() {
    return this.modal.find('#addExpenseMileage');
  }

  get litersInput() {
    return this.modal.find('#addExpenseLiters');
  }

  get totalCostInput() {
    return this.modal.find('#addExpenseTotalCost');
  }

  get submitButton() {
    return this.modal.contains('button', 'Add');
  }

  addExpense({ mileage, liters, totalCost }) {
    this.modal.should('be.visible');
    this.title.should('have.text', 'Add an expense');

    this.mileageInput.clear().type(mileage);
    this.litersInput.clear().type(liters);
    this.totalCostInput.clear().type(totalCost);

    this.submitButton.should('not.be.disabled').click();

    this.modal.should('not.exist');
  }
}

export default new ExpensesModal();
