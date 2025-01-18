// end-to-end tests for tech quiz
import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '../../client/src/components/Quiz';

describe('Quiz Component', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/questions/random', {
      fixture: 'questions.json'
    }).as('getQuestions');
  });

  it('should start the quiz correctly', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('.spinner-border').should('not.exist');
    cy.get('h2').should('exist');
  });

  it('should display questions correctly', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.get('h2').should('contain.text', 'Question 1');
    cy.get('.alert').should('have.length', 4);
  });

  it('should display the quiz completion correctly', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    for (let i = 0; i < 10; i++) {
      cy.get('button').contains('1', { timeout: 10000 }).should('exist').click();
      cy.log(`Clicked button 1 for question ${i + 1}`);
      cy.screenshot(`after-clicking-button-1-question-${i + 1}`);
    }
    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score:').should('exist');
  });
  
  it('should update the score correctly', () => {
    mount(<Quiz />);
    cy.contains('Start Quiz').click();
    cy.wait('@getQuestions');
    cy.screenshot('before-clicking-buttons');
    cy.get('button').contains('1').should('exist').click();
    cy.get('button').contains('2').should('exist').click();
    cy.get('button').contains('3').should('exist').click();
    cy.get('button').contains('4').click();
    cy.screenshot('after-clicking-buttons');
    cy.contains('Quiz Completed').should('exist');
    cy.contains('Your score:').should('exist');
  });

});