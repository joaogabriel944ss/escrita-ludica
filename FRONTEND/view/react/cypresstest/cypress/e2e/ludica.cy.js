describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')

    cy.get('[placeholder="Nome"]').type('cypress name')

cy.get('[placeholder="Email"]').type('cypress@email.com')

cy.get('[placeholder="Senha"]').type('123456')


cy.get('.bg-blue-600').click()

  

  })
})