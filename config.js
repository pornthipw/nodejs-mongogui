module.exports = {
  mongo_connect: {
    host: '10.10.20.75',
    port: 27017,
    db: 'test',
  },
  authorization: {
    mongodb:{
     server: '10.10.20.75',
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
    baseUrl: 'http://localhost:8083/',
    port: 8083,
    cookieSecret: 'cookiesecret',
    sessionSecret: 'sessionsecret'
  }
};
