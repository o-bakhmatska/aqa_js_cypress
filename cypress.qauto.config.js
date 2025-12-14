const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      basicAuthUser: 'guest',
      basicAuthPassword: 'welcome2qauto',
      userEmail: '101test101@gmail.com',
      userPassword: 'Password1'
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/qauto',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
