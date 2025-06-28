const { Eureka } = require('eureka-js-client');

// Configuration du client Eureka
const client = new Eureka({
  instance: {
    app: 'nodejs-service-messagerie', // Nom de ton service
    hostName: 'messagerie', // ou l'adresse IP de la machine où tourne Node.js
    ipAddr: '127.0.0.1',
    port: {
      '$': 3000, // Port sur lequel tourne ton API Node.js
      '@enabled': 'true',
    },
    vipAddress: 'nodejs-service',
    statusPageUrl: 'http://localhost:3000', // URL de health check (optionnel)
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: '147.79.118.51', // Adresse du serveur Eureka
    port: 8761, // Port du serveur Eureka
    //servicePath: '/eureka/apps/' // Important pour compatibilité Spring Cloud
  }
});

// Lancer l’enregistrement auprès d’Eureka
client.start(error => {
  console.log(error || 'Eureka registration complete');
});
