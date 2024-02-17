
describe('Fundamentals test', () => {
  //individual test
  beforeEach(()=>{
    cy.visit('/fundamentals')
  })
  it('Contains correct header text', () => {
    //contain test code
    //cy.visit('/fundamentals');
    cy.get('[data-test="fundamentals-header"]').contains("Testing Fundamentals");
    cy.get('[data-test="fundamentals-header"]').should('contain.text','Testing Fundamentals');
    //data-test="accordion-item-1"
  })
  it('Accordion works correctly', () => {
    //contain test code
    //cy.visit('/fundamentals');
    cy.contains(/Your tests will exist in a describe block./i).should('not.be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should('be.visible')
    cy.get('[data-test="accordion-item-1"] div[role="button"]').click()
    cy.contains(/Your tests will exist in a describe block./i).should('not.be.visible')
  })
})