import { loginPage } from "../page_objects/LoginPage"
import { myOrganizationsPage } from "../page_objects/MyOrganizationsPage"

describe ('login', () => {
    before('visit website', () => {
        cy.visit('/')
        loginPage.loginHeading.should('be.visible')
            .and('have.text','Log in with your existing account')
    })
    it('Login', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login'
        }).as('validLogin')

        cy.url().should('include', '/login');
        loginPage.login(
            Cypress.env('VALID_USER_EMAIL'),
            Cypress.env('VALID_USER_PASSWORD')
            )
        cy.wait('@validLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
    })

    cy.url().should('not.include', '/login');
    myOrganizationsPage.activeOrganizationsHeading.should('be.visible')
    })
})