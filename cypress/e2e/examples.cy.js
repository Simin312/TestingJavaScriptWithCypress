// multi-page testing
describe('Various example',()=>{
    beforeEach(()=>{
        cy.visit('/examples')
    })
    it('multi-page testing', ()=>{
        // go to base url
        cy.getDataTest('nav-why-cypress').click();
        cy.location('pathname').should("equal","/")

        cy.getDataTest('nav-overview').click();
        cy.location('pathname').should("equal","/overview")

        cy.getDataTest('nav-fundamentals').click();
        cy.location('pathname').should("equal","/fundamentals")

        cy.getDataTest('nav-forms').click();
        cy.location('pathname').should("equal","/forms")

        cy.getDataTest('nav-component').click();
        cy.location('pathname').should("equal","/component")

        cy.getDataTest('nav-best-practices').click();
        cy.location('pathname').should("equal","/best-practices")
        
        cy.getDataTest('nav-examples').click();
        cy.location('pathname').should("equal","/examples")
    
    })

    it('intercept', ()=>{
        cy.intercept("POST", 'http://localhost:3000/examples', {
            body:{
                message: 'successfully intercepted request'
            }
        })
        cy.getDataTest('post-button').click()
    })

    it.only('grudges',()=>{
        cy.contains(/add some grudges/i)
        // add grudge
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').should('have.length',0)
        })

        // check clear button should not exist
        cy.getDataTest('clear-button').should('not.exist')

        // check the grudge title
        cy.getDataTest('grudge-list-title').should('have.text', 'Add Some Grudges')

        // add grudge
        cy.getDataTest('grudge-input').within(()=>{
            cy.get('input').type('some grudge')
        })
        cy.getDataTest('add-grudge-button').click()
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').should('have.length',1)
        })

        cy.getDataTest('grudge-list-title').should('have.text', 'Grudges')

        // add grudge
        cy.getDataTest('grudge-input').within(()=>{
            cy.get('input').type('some another grudge')
        })
        cy.getDataTest('add-grudge-button').click()
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').should('have.length',2)
            cy.get('li').its(0).should('contain.text','some grudge')
        })

        // delete first grudge
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').its(0).within(()=>{
                cy.get('button').click()
            })
        })
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').should('have.length',1)
        })

        cy.getDataTest('clear-button').click()
        cy.getDataTest('grudge-list').within(()=>{
            cy.get('li').should('have.length',0)
        })
    })  
})