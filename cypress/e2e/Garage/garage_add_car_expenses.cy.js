import GaragePage from '../../pages/garagePage';
import ExpensesModal from '../../pages/expensesModal';

describe('Garage and Fuel Expenses positive test', () => {

  beforeEach(() => {
    cy.loginUI();
  });

  it('Should add a car and add fuel expense to the created car', () => {
    const carData = {
      brand: 'Audi',
      model: 'A8',
      mileage: '1000'
    };
    GaragePage.addCar(carData);
  
    GaragePage.assertLastAddedCarIs({
      brand: carData.brand,
      model: carData.model
    });

    GaragePage.getLastAddedCar().then((car) => {
      GaragePage.getLastAddedCar().contains('Audi A8').should('be.visible');
      GaragePage.getAddFuelExpenseButtonForCar(car).click();
    });
  
    ExpensesModal.addExpense({
      mileage: '1100',
      liters: '20',
      totalCost: '1200'
    });
  
   cy.get('table.expenses_table tbody tr').should('have.length', 1).first().within(() => {
   cy.get('td').eq(1).should('contain.text', '1100');
   cy.get('td').eq(2).should('contain.text', '20L');
   cy.get('td').eq(3).should('contain.text', '1200');
   });

});
});




