const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      basicAuthUser: 'guest',
      basicAuthPassword: 'welcome2qauto',

      registeredUserEmail: '101test101@gmail.com',
      registeredUserPassword: 'Password1'
    }
  }
});