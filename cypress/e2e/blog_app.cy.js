describe('Repeating tests with bypassing UI', () => {
  beforeEach(() => {
    //emptying db
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    cy.visit('')
  })

  it('Login form is shown', () => {
    cy.contains('log in')
    cy.contains('log in').click()
  })

  describe('Login', () => {
    beforeEach(() => {
      const user = {
        name: 'Beren Varol',
        username: 'berenvrll',
        password: 'berenvrll123,',
      }

      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    })

    it('succeeds with correct credentials', () => {
      cy.login({ username: 'berenvrll', password: 'berenvrll123,' })
    })

    it('fails with wrong credentials', () => {
      cy.contains('log in').click()
      cy.get('#username').type('bbbrnnvrl')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      //check error message
      cy.get('.error').contains('wrong credentials')
      // cy.get('.error').should('contain','wrong credentials')
      cy.get('.error').should('have.css', 'color', 'rgb(179, 20, 20)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Beren Varol logged in')
      cy.contains('Beren Varol logged in').should('not.exist')
    })
  })
})

describe('Blog App', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('login page can be opened', () => {
    cy.contains('Blogs')
    cy.contains('log in')
  })

  it('user can login', () => {
    cy.contains('log in').click()
    cy.get('#username').type('berenvrll')
    cy.get('#password').type('berenvrll123,')
    cy.get('#login-button').click()

    cy.contains('Beren Varol logged in') //login successful
  })

  it('login fails with wrong password', function () {
    cy.contains('log in').click()
    cy.get('#username').type('bbbrnnvrl')
    cy.get('#password').type('wrongpassword')
    cy.get('#login-button').click()

    //check error message
    cy.get('.error').contains('wrong credentials')
    // cy.get('.error').should('contain','wrong credentials')
    cy.get('.error').should('have.css', 'color', 'rgb(179, 20, 20)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Beren Varol logged in')
    cy.contains('Beren Varol logged in').should('not.exist')
  })
})

describe('BlogApp blog creation', () => {
  beforeEach(() => {
    cy.visit('')
    cy.contains('log in').click()
    cy.get('#username').type('berenvrll')
    cy.get('#password').type('berenvrll123,')
    cy.get('#login-button').click()
    cy.contains('Beren Varol logged in') //login successful
  })
  it('new blog can be added', () => {
    cy.contains('New Blog').click()
    cy.get('#title').type('this is new title')
    cy.get('#author').type('this is new author')
    cy.get('#url').type('this is new url')
    cy.get('#likes').type(34)
    cy.contains('Save').click()
    cy.contains('this is new title this is new author')
  })
  it('user can like a blog', () => {
    cy.contains('View').click()
    cy.contains('34')
    cy.contains('Likes').click()
  })
})
