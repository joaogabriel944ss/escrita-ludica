describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://escrita-ludica-lfix.onrender.com')

    cy.get('[placeholder="Nome"]').type('cypressname')

cy.get('[placeholder="Email"]').type('cypressemail@example.com')

cy.get('[placeholder="Senha"]').type('cypresspassword')

cy.get('.bg-blue-600').click()

cy.get('.cursor-poiter').click()

cy.get('[placeholder="Email"]').type('cypressemail@example.com')

cy.get('[placeholder="Senha"]').type('cypresspassword')
  })

  
})