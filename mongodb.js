/**
 * Mongoose Helper
 */
 const mongoose = require('mongoose');
 const url = require('url');
 const debug = require('debug');
 const config = require('./config');
 
 const log = debug('LiveACID:mongo-module ');
 
 let connection;

 const client = async () => {
     if (connection) {
         return connection;
     }
     try {
         log('Connecting to MongoDB...');
 
         const {
             username,
             password,
             protocol,
             hostname,
             params,
             port,
             database,
             ssl,
             ca
         } = config.mongodb;
         
         const auth = username ? `${username}:${password}` : undefined;
         const host = port ? `${hostname}:${port}` : hostname;
         const pathname = database;
         const search = params? `?${params}` : '';
         
         const mongoUrl = url.format({
             protocol: protocol,
             slashes: true,
             auth,
             host,
             pathname,
             search
         });
         
         // tells mongo not to use deprecated settings
         const mongoOptions = {
             useUnifiedTopology: true,
             useFindAndModify: false,
             useCreateIndex: true,
         };
 
         if (ssl) {
             mongoOptions.ssl = true;
             mongoOptions.sslValidate = true;
             mongoOptions.sslCA = Buffer.from(ca, 'base64').toString('ascii');
         }
         
         console.log("MONGO URL: ", mongoUrl);
         await mongoose.connect(mongoUrl, mongoOptions);
 
         connection = mongoose.connection;
         connection.on('error', console.error.bind(console, 'connection error:'));
         
         log('DB Successfully Connected...');
         return connection.getClient();

     } catch (err) {
         log(`Error connecting to MongoDB:\n${err}`);
         throw err;
     }
 };
 
 module.exports = {
     client,
 };
 