describe('Fluxo Completo: Cadastro, Login e Criação de Livro', () => {
  it('Deve preencher o título e a sinopse corretamente', () => {
   
    cy.visit('https://escrita-ludica-lfix.onrender.com')

  
    cy.get('[placeholder="Nome"]').type('cypressname')
    cy.get('[placeholder="Email"]').type('cypressemail@example.com')
    cy.get('[placeholder="Senha"]').type('cypresspassword')
    cy.get('.bg-blue-600').click()

   
    cy.get('.cursor-poiter').click()

    // 4. Login
    cy.get('[placeholder="Email"]').type('cypressemail@example.com')
    cy.get('[placeholder="Senha"]').type('cypresspassword')
    cy.get('.bg-blue-700').click()

   
    cy.url().should('include', '/livros')
    
   
    cy.get('input[placeholder="Título"]')
      .should('be.visible')
      .type('Meu Novo Livro Automático', { delay: 100 })

    
    cy.get('textarea[placeholder="Sinopse"]')
      .should('be.visible')
      .type('Esta sinopse foi escrita pelo Cypress para validar o formulário.', { delay: 50 })

    
    cy.get('select').select(1) 
    cy.get('button').contains('Salvar').click()
  })
})