describe('forms tests', ()=>{
    beforeEach(()=>{
        cy.visit('/forms')
    })
    it('Test subscribe form',()=>{
        cy.contains(/testing forms/i)
        cy.get('[data-test="subscribe-form"]').find('input').type('ryan@coderyan.com')
        cy.contains(/Successfully subbed: ryan@coderyan.com!/i).should('not.exist')
        cy.get('[data-test="subscribe-button"]').click()
        cy.contains(/Successfully subbed: ryan@coderyan.com!/i).should('exist')
    
        //using "as" to represent the refer element; shorter the code 
        cy.get('[data-test="subscribe-form"]').find('input').as('subscribe-input')
        
        cy.get('@subscribe-input').clear()
        cy.get('@subscribe-input').type('siminchan312@gmail.com')
        cy.contains(/Successfully subbed: siminchan312@gmail.com!/i).should('not.exist')
        //cy.get('[data-test="subscribe-button"]').click()
        cy.getDataTest('subscribe-button').click()
        cy.contains(/Successfully subbed: siminchan312@gmail.com!/i).should('exist')
        cy.wait(3)
        cy.contains(/Successfully subbed: siminchan312@gmail.com!/i).should('not.exist')

        //not happy path
        cy.get('@subscribe-input').type('Simon@gmail.io')
        cy.getDataTest('subscribe-button').click()
        cy.contains(/invalid email: Simon@gmail.io/i).should('exist')
        cy.wait(3)
        cy.contains(/invalid email: Simon@gmail.io/i).should('not.exist')

         // with empty input
         cy.contains(/fail!/i).should('not.exist')
         cy.getDataTest('subscribe-button').click()
         cy.contains(/fail!/i).should('exist')
    })
})