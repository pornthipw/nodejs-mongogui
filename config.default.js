module.exports = {
  mongo_connect: {
    host: 'localhost',
    port: 27017,
    db: 'test',
  },
  authorization: {
    mongodb:{
     host: 'localhost',
     port: 27017,
     db: 'projectplan',
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
