const host = Cypress.env('host')

describe('Given user is not logged in', () => {

  describe('When user is accessing public locations', () => {

    it('Should have access to the Home Page', () => {
      cy.visit(`${host}`)
      cy.url().should('equal', `http://${host}/`)
      cy.title().should('equal', 'Inner Circle')
    })

    it('Should access the How-To-Use Page', () => {
      cy.visit(`${host}/how-to-use`)
      cy.url().should('equal', `http://${host}/how-to-use`)
      cy.title().should('equal', 'How to use ▲ Inner Circle')
    })

    it('Should access the Login Page', () => {
      cy.visit(`${host}/login`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })

    it('Should access the Privacy Page', () => {
      cy.visit(`${host}/privacy`)
      cy.url().should('equal', `http://${host}/privacy`)
      cy.title().should('equal', 'Privacy ▲ Inner Circle')
    })

    it('Should access the Terms and Conditions Page', () => {
      cy.visit(`${host}/terms-and-conditions`)
      cy.url().should('equal', `http://${host}/terms-and-conditions`)
      cy.title().should('equal', 'Terms of Service ▲ Inner Circle')
    })

  })

  

  describe('When user attempts to access secure locations', () => {

    it('Should not access the Dashboard when unauthenticated', () => {
      cy.visit(`${host}/dashboard`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })

    it('Should not access the Contacts Page when unauthenticated', () => {
      cy.visit(`${host}/contacts`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })

    it('Should not access the Contacts/new Page when unauthenticated', () => {
      cy.visit(`${host}/contacts/new`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })

    it('Should not access the Account Page when unauthenticated', () => {
      cy.visit(`${host}/account`)
      cy.url().should('equal', `http://${host}/login`)
      cy.title().should('equal', 'Login ▲ Inner Circle')
    })

  })
})

describe('Social Logins Demo', () => {
  beforeEach(() => {
    // can provide Facebook, Google, or Microsoft here
    cy.loginToAuth0ViaSocial('google')
    cy.visit(`${host}`)
  })

  it('navigates to the app after navigation and displays the sample project header', () => {
    cy.url().should('equal', `http://${host}/`)
    cy.title().should('equal', 'Inner Circle')
  })
})

// describe('Given user is logged in', () => {
//   before(() => {
//     cy.visit(`${host}/login`)
//     cy.get('#google-login').click()
//     cy.wait(500)
//     cy.origin('https://accounts.google.com', () => {
//       cy.get('#identifierId').type(Cypress.env('testAccount'))
//       //get button containing text 'Next' and click it
//       cy.get('.query-list').contains('Next').click()
//       cy.wait(500)
//     })

    
//   })

  

//   describe('When user is accessing public locations', () => {

//     it('Should have access to the Home Page', () => {
//       cy.visit(`${host}`)
//       cy.url().should('equal', `http://${host}/`)
//       cy.title().should('equal', 'Inner Circle')
//     })

//     it('Should access the How-To-Use Page', () => {
//       cy.visit(`${host}/how-to-use`)
//       cy.url().should('equal', `http://${host}/how-to-use`)
//       cy.title().should('equal', 'How to use ▲ Inner Circle')
//     })

//     it('Should access the Login Page', () => {
//       cy.visit(`${host}/login`)
//       cy.url().should('equal', `http://${host}/login`)
//       cy.title().should('equal', 'Login ▲ Inner Circle')
//     })

//     it('Should access the Privacy Page', () => {
//       cy.visit(`${host}/privacy`)
//       cy.url().should('equal', `http://${host}/privacy`)
//       cy.title().should('equal', 'Privacy ▲ Inner Circle')
//     })

//     it('Should access the Terms and Conditions Page', () => {
//       cy.visit(`${host}/terms-and-conditions`)
//       cy.url().should('equal', `http://${host}/terms-and-conditions`)
//       cy.title().should('equal', 'Terms of Service ▲ Inner Circle')
//     })
//   })

//   describe('When user attempts to access secure locations', () => {

//     it('Should access the Account Page when authenticated', () => {
//       cy.visit(`${host}/account`)
//       cy.url().should('equal', `http://${host}/account`)
//       cy.title().should('equal', 'Account ▲ Inner Circle')
//     })
//   })
// })