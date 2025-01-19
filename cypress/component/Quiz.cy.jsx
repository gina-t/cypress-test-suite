import React from 'react';
import Quiz from '../../client/src/components/Quiz';
import questions from '../fixtures/questions.json';

describe('<Quiz />', () => {
  it('renders the start quiz button', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('div.p-4.text-center').should('exist').within(() => {
      cy.get('button.btn.btn-primary.d-inline-block.mx-auto')
        .should('contain', 'Start Quiz')
        .click();
    });
  });

  it('renders the question card correctly', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('button.btn.btn-primary').click();
    cy.wait('@getQuestions');
    const sampleQuestion = questions[0];
    cy.get('div.card.p-4').within(() => {
      cy.get('h2').should('contain', sampleQuestion.question);
      cy.get('.alert.alert-secondary').should('have.length', sampleQuestion.answers.length);
      sampleQuestion.answers.forEach((answer, index) => {
        cy.get('.alert.alert-secondary').eq(index).should('contain', answer.text);
      });
    });
  });
  
  it('highlights the button associated with the selected answer prior to click', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('button.btn.btn-primary').click();
    cy.wait('@getQuestions');
    cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
      cy.get('button.btn.btn-primary').should('not.have.class', 'selected');
    });
  });

  it('clicking on answer div does not trigger the button click', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('button.btn.btn-primary').click();
    cy.wait('@getQuestions');
    cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
      cy.get('.alert.alert-secondary').click();
      cy.get('button.btn.btn-primary').should('not.have.class', 'selected');
    });
  });

  it('renders the quiz completed card correctly', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('button.btn.btn-primary').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < questions.length; i++) {
      cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
        cy.get('button.btn.btn-primary').click();
      });
    }
    cy.get('div.card.p-4.text-center').within(() => {
      cy.get('h2').should('contain', 'Quiz Completed');
      cy.get('.alert-success').should('contain', `Your score: ${questions.length}`);
    });
  });

  it('renders the take new quiz button', () => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
    cy.mount(<Quiz />);
    
    cy.get('button.btn.btn-primary').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < questions.length; i++) {
      cy.get('div.d-flex.align-items-center.mb-2').eq(0).within(() => {
        cy.get('button.btn.btn-primary').click();
      });
    }
    cy.get('button.btn.btn-primary.d-inline-block.mx-auto').should('contain', 'Take New Quiz');
  });
});

