

describe('Unauth Navigation', () => {
  const host = Cypress.env('host')
  describe('Can visit unsecure locations', () => {
    it('can visit / is accessible', () => {
      cy.visit(`${host}`)
      cy.url().should('equal', `http://${host}/`)
      cy.title().should('equal', 'Inner Circle')
    })
    it('can visit /how-to-use is accessible', () => {
      cy.visit(`${host}/how-to-use`)
      cy.url().should('equal', `http://${host}/how-to-use`)
      cy.title().should('equal', 'How to use ▲ Inner Circle')
    })
    it('can visit /login is accessible', () => {
      cy.visit(`${host}/login`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })
    it('can visit /privacy is accessible', () => {
      cy.visit(`${host}/privacy`)
      cy.url().should('equal', `http://${host}/privacy`)
      cy.title().should('equal', 'Privacy ▲ Inner Circle')
    })
    it('can visit /terms-and-conditions is accessible', () => {
      cy.visit(`${host}/terms-and-conditions`)
      cy.url().should('equal', `http://${host}/terms-and-conditions`)
      cy.title().should('equal', 'Terms of Service ▲ Inner Circle')
    })
    
  })
  describe('Cannot visit secure locations without session', () => {
    it('cannot visit /dashboard is not accessible', () => {
      cy.visit(`${host}/dashboard`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })
    it('cannot visit /contacts is not accessible', () => {
      cy.visit(`${host}/contacts`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })
    it('cannot visit /contacts is not accessible', () => {
      cy.visit(`${host}/account`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })
  })
})