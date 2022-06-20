class CertainOrganizationPage {

    get addBoardBtn() {
        return cy.get('div[class="vs-c-organization-boards__item--add-new"]')
    }

    get boardTitleInput() {
        return cy.get('input[placeholder="Enter title..."]')
    }

    get nextBtn() {
        return cy.get('button[name="next_btn"]')
    }

    get next2Btn() {
        return cy.get('button[name="save-btn"]');
    }

    get deleteBtn() {
    return cy.get('button[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]')
    }

    get scrumCheckbox() {
        return cy.get('span[name="type_scrum"]')
    }

    get nekiModalBtn() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    get yesBtn() {
        return cy.contains('button', 'Yes');
    }

    addBoard(boardName) {
        this.addBoardBtn.click()
        this.boardTitleInput.type(boardName)
        this.nextBtn.click()
        this.scrumCheckbox.click()
        this.nextBtn.click()
        this.nextBtn.click()
        this.nextBtn.click()
        this.nextBtn.click()

    }

    deleteBoard(){
        this.deleteBtn.click()
        this.yesBtn.click()

    }
}
export const certainOrganizationPage = new CertainOrganizationPage();

