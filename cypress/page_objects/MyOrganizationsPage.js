class MyOrganizationsPage {

    get activeOrganizationsHeading() {
        return cy.get('p')
    }

    
    get addNewBtn() {
        return cy.get('div[class="vs-c-list__btn"]')
    }
    
    get myOrganizationBtn() {
        return cy.get('div[class="vs-c-my-organization vs-c-my-organization--add-new not-sortable"]')   
    }
    
    get organizationNameInput() {
        return cy.get('input[type="text"]')
    }
    
    get nextBtn() {
        return cy.get(':button').contains("Next")
    }
    
    get fileInput() {
        return cy.get('a[class="vs-c-btn vs-c-btn--rounded"]')
    }
    
    get createBtn() {
        return cy.get('button[name="next_btn"]').contains("Create")
    }
    
    get uploadBtn() {
        return cy.get('button[name="save-btn"]').contains("Upload")
    }
    
    createOrganization(name) {
        this.myOrganizationBtn.click()
        this.organizationNameInput.type(name)
        this.nextBtn.click()
        this.createBtn.click()
    }

    get organizationsWrapper() {
    return cy.get('div[class="vs-c-my-organizations-item-wrapper"]')
    }
}

export const myOrganizationsPage = new MyOrganizationsPage();
