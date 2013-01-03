module.exports = {
  mongo_connect: {
    host: 'localhost',
    //host: '10.10.20.75',
    port: 27017,
    db: 'test',
  },
  authorization: {
    mongodb:{
     host: 'localhost',
     //host: '10.10.20.75',
     port: 27017,
     db: 'test',
     collection_name: 'nook_ac_1',
     autoReconnect: true,
     poolSize: 4
    }
  },
  site: {
    //baseUrl: the URL that mongo express will be located at
    //Remember to add the forward slash at the end!
    baseUrl: 'http://localhost:9011/',
    port: 9011,
    cookieSecret: 'cookiesecret',
    sessionSecret: 'sessionsecret'
  }
};
