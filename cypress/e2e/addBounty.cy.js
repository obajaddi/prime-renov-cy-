import 'cypress-if';

describe('empty spec', () => {
  before(() => {
    // Suite au login
    cy.intercept({
      method: 'POST',
      url: '/prweb/app/AIDESSystemTeam_/p9LHKCyMGSnBHUD9_WaTkzcUazp6tuc1nquFA8hQmEg\*/!STANDARD?pzTransactionId=*',
      https: true,
    }).as('submitLoginForm');
    // Suite au click "Retour à mes dossiers"
    cy.intercept({
      method: 'POST',
      url: '/prweb/app/AIDESSystemTeam_/p9LHKCyMGSnBHUD9_WaTkzcUazp6tuc1nquFA8hQmEg\*/!DCSPA_PortalEndUser?pzTransactionId=*',
      https: true,
    }).as('retourMesDossiers');
  });
  
  beforeEach(() => {
    cy.visit('/prweb/app/default/H9DF1ufnPCNDOGG8PFgaaW3tLvvaZHE9*/!STANDARD');
  })

  it('I want to add a new bounty', () => {
    cy.log('I want to log in my account')
    cy.title().should('include', 'MaPrimeRénov');
    cy.get('#txtUserID').clear().type('DemandeurRezque');
    cy.get('#txtPassword').clear().type('Rules222#');
    cy.get('.Valider').click();
    cy.wait('@submitLoginForm').its('response.statusCode').should('eq', 200, { timeout: 5000 });
    
    // Si on n'est pas sur la page d'accueil
    cy.contains('Retour à mes dossiers').if('visible').click().then(() => {
      cy.wait('@retourMesDossiers').its('response.statusCode').should('eq', 200, { timeout: 5000 });
    });

    cy.get("div[data-tour-id='BUTTON-PLUS-CREATE-NEW-CASE'] > span > i > img[role='button']")
      .should('be.visible')
      .click({ force: true });
  })
})