const { Eureka } = require('eureka-js-client');


const client = new Eureka({
  instance: {
    app: 'nodejs-service-messagerie', 
    hostName: 'messagerie', 
    ipAddr: '127.0.0.1',
    port: {
      '$': 3000, 
      '@enabled': 'true',
    },
    vipAddress: 'nodejs-service',
    statusPageUrl: 'http://localhost:3000',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: '147.79.118.51',
    port: 8761, 
  }
});

client.start(error => {
  console.log(error || 'Eureka registration complete');
});
