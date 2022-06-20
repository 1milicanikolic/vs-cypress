const  faker = require ('@faker-js/faker');
import { loginPage } from "../page_objects/LoginPage"
import { myOrganizationsPage } from "../page_objects/MyOrganizationsPage"
import { certainOrganizationPage } from '../page_objects/CertainOrganizationPage'
describe ('add board via entering created organization', () => {
    let organizationId;
    let boardId;
    const organizationData = {
        organizationName: faker.name.firstName()
        }
    const boardData = {
        boardName: faker.name.firstName()
    }

    before('visit website and login', () => {
        cy.visit('/')
        loginPage.login(
            Cypress.env('VALID_USER_EMAIL'),
            Cypress.env('VALID_USER_PASSWORD')
            )
        cy.url().should('not.include','/login')
        cy.url().should('include', '/my-organizations')
    })

    it('create organization', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/organizations'
        }).as('successfulCreationOfOrganization')
        cy.url().should('include', '/my-organizations')
        myOrganizationsPage.createOrganization(
            organizationData.organizationName,
            )
        cy.wait('@successfulCreationOfOrganization').then(interception => {
            organizationId = interception.response.body.id
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.name).eq(organizationData.organizationName)
            cy.visit(`/organizations/${organizationId}/boards`)
            cy.url().should('include', '/boards')
            cy.wait(6000)
            certainOrganizationPage.nekiModalBtn.click()
            //'add board'
        cy.intercept({
            method: 'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards'
        }).as('addingBoard')
        cy.url().should('include', '/boards')
        certainOrganizationPage.addBoard(
            boardData.boardName,
            )
        cy.wait('@addingBoard').then(interception => {
            boardId = interception.response.body.id
            expect(interception.response.statusCode).eq(201)
            expect(interception.response.body.name).eq(boardData.boardName)
        })
        cy.visit(`/boards/${boardId}/settings`)
    })

    it('delete board', () => {
        cy.intercept({
            method: 'DELETE',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
        }).as('deleteBoard')
        cy.url().should('include', '/boards')
        certainOrganizationPage.deleteBoard()
        cy.wait('@deleteBoard').then(interception => {
            expect(interception.response.statusCode).eq(200)
            expect(interception.response.body.name).eq(boardData.boardName)
            expect(interception.response.body.id).eq(boardId)
            cy.visit('/my-organizations')
            myOrganizationsPage.organizationsWrapper.should('not.include', boardData.boardName)

    })



    })
})
})