const defaultHost = 'localhost';
const defaultPort = 45500;

const env = process.env.NODE_ENV || 'dev';

module.exports = {
    project: {
      name: process.env.APP_NAME || 'Hello-NodeJs',
      environment: process.env.NODE_ENV || 'dev',
    },
    server: {
      defaultHost: defaultHost,
      host: process.env.HOST || defaultHost,
      port: process.env.PORT || defaultPort,
      serverRoot: process.env.SERVER_ROOT || '/api',
      corsOrigins: process.env.CORS_ORIGINS || [`http://${defaultHost}:${defaultPort}`],
    },
    params: {
      remoteApi: (env != "dev") ? process.env.REMOTE_API : "localhost:81/api",
    }  
  }