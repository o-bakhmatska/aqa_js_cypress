class GaragePage {
    get carModal() {
        return cy.get('ngb-modal-window');
    }

    get addCarButton() {
      return cy.contains('button', 'Add car');
    }
 
    get brandSelect() {
      return this.carModal.find('#addCarBrand');
    }
  
    get modelSelect() {
      return this.carModal.find('#addCarModel');
    }
  
    get mileageInput() {
      return this.carModal.find('#addCarMileage');
    }

    get submitButton() {
        return this.carModal.contains('button', 'Add');
    }

    get cancelButton() {
        return this.carModal.find('button', 'Cancel');
      }
  
    addCar({ brand, model, mileage }) {
      this.addCarButton.click();
      this.brandSelect.select(brand);
      this.modelSelect.select(model);
      this.mileageInput.type(mileage);
      this.submitButton.click();
      this.carModal.should('not.exist');
      cy.get('.alert.alert-success').should('be.visible').and('contain.text', 'Car added');
    }

    get carList() {
        return cy.get('app-car');
      }
    getLastAddedCar() {
        return this.carList.first();
      }
    getAddFuelExpenseButtonForCar(carElement) {
        return carElement.find('button.car_add-expense');
      }

    getCarTitle(carElement) {
        return carElement.find('.car_name'); 
      }
    
    assertLastAddedCarIs({ brand, model }) {
        this.getLastAddedCar().should('be.visible').within(() => {
            cy.contains(`${brand} ${model}`).should('be.visible');
          });
      }
    }

  
  export default new GaragePage();
