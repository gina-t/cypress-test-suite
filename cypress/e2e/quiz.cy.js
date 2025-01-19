// end-to-end tests for tech quiz

describe('Tech Quiz E2E Tests', () => {

  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
  });

  it ('successfully loads', () => {
    cy.visit('/');
  });

  it('visiting the url should display the start quiz button', () => {
    cy.visit('/');
    cy.contains('Start Quiz').should('be.visible');
  });


  it('should start the quiz and display the first question', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.get('div.card.p-4').should('be.visible');
  });

  it('should allow the user to answer a question and move to the next', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
      cy.get('button.btn.btn-primary').click();
    });
    cy.get('div.card.p-4').should('be.visible');
  });

  it('should validate if the selected answer is correct or incorrect', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
      cy.get('button.btn.btn-primary').click();
    });
    cy.get('div.alert.alert-secondary').should('be.visible');
  });  

  it('should display the results after completing the quiz', () => {
    cy.visit('/');
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < 9; i++) { 
      cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
        cy.get('button.btn.btn-primary').click();
      });
    }
    cy.get('div.card.p-4.text-center').within(() => {
      cy.get('h2').should('contain', 'Quiz Completed');
      cy.get('div.alert.alert-success').should('contain', `Your score: 9/9`);
      cy.get('button.btn.btn-primary.d-inline-block.mx-auto').should('be.visible');
    });
  });

  it('should seed the database', () => {
    cy.exec('npm run seed').then(() => {
      cy.request('/api/questions/random').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  });
  
});  