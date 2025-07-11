const Eureka = require('eureka-js-client').Eureka;

const client = new Eureka({
  instance: {
    app: 'messagerie-service',
    hostName: 'messagerie-service',
    ipAddr: 'localhost',
    port: {
      '$': 3000,
      '@enabled': true,
    },
    vipAddress: 'api-messagerie-service',
    // ❌ CORRIGÉ: URLs avec le nom du container Docker, pas localhost
    statusPageUrl: 'http://localhost:3000/swagger-ui',
    healthCheckUrl: 'http://api-messagerie-service:3000/health',
    homePageUrl: 'http://api-messagerie-service:3000/',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
    // ❌ RETIRÉ: ces propriétés ne vont pas dans instance mais dans eureka
    // registerWithEureka: true,
    // fetchRegistry: true,
  },
  eureka: {
    host: 'discovery-service',
    port: 8761,
    servicePath: '/eureka/apps/',
    // ✅ AJOUTÉ: propriétés manquantes critiques
    registerWithEureka: true,        // déplacé ici
    fetchRegistry: true,             // déplacé ici
    maxRetries: 10,                  // augmenté pour Docker
    requestRetryDelay: 5000,         // délai plus long pour Docker
    heartbeatInterval: 30000,        // intervalle de heartbeat
    registryFetchInterval: 30000,    // intervalle de récupération
  }
});

// ✅ AMÉLIORÉ: Démarrage avec délai et gestion d'erreurs
setTimeout(() => {
  console.log('📡 Tentative d\'enregistrement auprès d\'Eureka...');
  
  client.start(error => {
    if (error) {
      console.error('❌ Eureka registration failed:', error);
      // Réessayer après 10 secondes
      setTimeout(() => {
        console.log('🔄 Nouvelle tentative d\'enregistrement...');
        client.start();
      }, 10000);
    } else {
      console.log('✅ Eureka registration complete');
    }
  });
}, 10000); // Attendre 10 secondes après le démarrage

// ✅ AJOUTÉ: Gestion propre de l'arrêt
process.on('SIGINT', () => {
  console.log('🛑 Arrêt du service...');
  client.stop(() => {
    console.log('✅ Service désenregistré d\'Eureka');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du service (SIGTERM)...');
  client.stop(() => {
    console.log('✅ Service désenregistré d\'Eureka');
    process.exit(0);
  });
});