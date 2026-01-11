const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space',
    env: {
      basicAuthUser: 'guest',
      basicAuthPassword: 'welcome2qauto',
      userEmail: '202test202@gmail.com',
      userPassword: 'Password1'
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports/qauto2',
      overwrite: false,
      html: true,
      json: true
    }
  }
});
