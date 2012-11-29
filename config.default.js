module.exports = {  
  site: {
    //baseUrl: the URL that mongo express will be located at
    //Remember to add the forward slash at the end!
    baseUrl: 'http://localhost:8083',
    port: 8083,
    cookieSecret: 'cookiesecret',
    sessionSecret: 'sessionsecret'
  },
  options: {
    //documentsPerPage: how many documents you want to see at once in collection view
    documentsPerPage: 10,
    //editorTheme: Name of the theme you want to use for displaying documents
    //See http://codemirror.net/demo/theme.html for all examples
    editorTheme: "rubyblue",

    //The options below aren't being used yet

    //cmdType: the type of command line you want mongo express to run
    //values: eval, subprocess
    //  eval - uses db.eval. commands block, so only use this if you have to
    //  subprocess - spawns a mongo command line as a subprocess and pipes output to mongo express
    cmdType: 'eval',
    //subprocessTimeout: number of seconds of non-interaction before a subprocess is shut down
    subprocessTimeout: 300
  }
};
