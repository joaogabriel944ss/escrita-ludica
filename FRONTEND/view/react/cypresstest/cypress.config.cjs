const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Desativa a gravação de vídeos para economizar processamento
    video: false,
    
    // Desativa capturas de tela automáticas em caso de falha
    screenshotOnRunFailure: false,
    
    // Limita o uso de memória RAM mantendo apenas 5 testes no histórico do navegador
    numTestsKeptInMemory: 5,

    setupNodeEvents(on, config) {
      
    },
  },
});