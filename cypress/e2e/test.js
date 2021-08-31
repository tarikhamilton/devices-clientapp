describe('App Dashboard', () => {
  const SICK_GAMING_PC = 'SICK-GAMING-PC'

  it('can get to the dashboard', () => {
    cy.visit('/')
    cy.findByText(/^device dashboard$/i).should('exist')
  })

  it('can see the list of devices', () => {
    cy.get('article').should('have.lengthOf', 10)
  })

  it('can filter by a device type', () => {
    cy.findAllByText(/Mac/i).should('exist')
    cy.findAllByText(/Windows Workstation/i).should('exist')
    cy.findByLabelText(/filter by/i)
      .type('Mac', { force: true })
      .type('{enter}')
    cy.findAllByText(/Windows Workstation/i).should('not.exist')
    cy.findAllByText(/Mac/i).should('exist')
    cy.findByLabelText(/filter by/i)
      .type('{backspace}', { force: true })
      .type('{enter}')
  })

  it('can sort devices by system name', () => {
    const lowestName = 'ARMANDO-SERVER'
    cy.get('article:first-of-type').findByText(lowestName).should('not.exist')
    cy.findByLabelText(/sort by/i).click({ force: true })
    cy.findByText(/A-Z/i).click({ force: true })
    cy.get('article:first-of-type').findByText(lowestName).should('exist')
    cy.findByLabelText(/sort by/i)
      .click({ force: true })
      .type('{uparrow}{uparrow}{uparrow}{enter}')
  })

  it('can sort devices by HDD capacity', () => {
    const highestCapacity = /2048/
    cy.get('article:last-of-type')
      .findByText(highestCapacity)
      .should('not.exist')
    cy.findByLabelText(/sort by/i).click({ force: true })
    cy.findByText(/HDD - Lowest to Highest/i).click({ force: true })
    cy.get('article:last-of-type').findByText(highestCapacity).should('exist')
    cy.findByLabelText(/sort by/i)
      .click({ force: true })
      .type('{uparrow}{uparrow}{uparrow}{enter}')
  })

  it('can create a device', () => {
    cy.findByText(/add device/i).click()
    cy.findByLabelText(/system name/i).type(SICK_GAMING_PC)
    cy.findByLabelText(/type/i)
      .type('Windows Workstation', { force: true })
      .type('{enter}')
    cy.findByLabelText(/capacity/i).type('69')
    cy.findByText(/save/i).click()
    cy.findByText(SICK_GAMING_PC).should('exist')
    cy.findByText(/69/i).should('exist')
    cy.get('article').should('have.lengthOf', 11)
  })

  it('can edit a device', () => {
    cy.get('article:last-of-type').findByText(/edit/i).click()
    cy.findByLabelText(/capacity/i).type('42')
    cy.findByText(/save/i).click()
    cy.findByText(/6942/).should('exist')
  })

  it('can remove a device', () => {
    cy.get('article:last-of-type')
      .findByText(/delete/i)
      .click()
    cy.findByText(SICK_GAMING_PC).should('not.exist')
  })
})
