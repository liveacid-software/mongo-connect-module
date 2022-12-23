"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
/**
 * Mongoose Helper
 */
const mongoose = __importStar(require("mongoose"));
const url = __importStar(require("url"));
const config_1 = __importDefault(require("./config"));
let connection;
const client = async () => {
    if (connection) {
        return connection.getClient();
    }
    try {
        const { username, password, protocol, hostname, params, port, database, ssl, ca } = config_1.default.mongodb;
        const auth = username ? `${username}:${password}` : undefined;
        const host = port ? `${hostname}:${port}` : hostname;
        const pathname = database;
        const search = params ? `?${params}` : '';
        const mongoUrl = url.format({
            protocol: protocol,
            slashes: true,
            auth,
            host,
            pathname,
            search
        });
        const mongoOptions = {
            ssl,
            sslValidate: ssl
        };
        if (ssl) {
            mongoOptions.sslCA = Buffer.from(ca, 'base64').toString('ascii');
        }
        mongoose.set('strictQuery', true);
        console.log('Mongo Connect URL: ', mongoUrl);
        console.log('Mongo Connect: Connecting to MongoDB...');
        await mongoose.connect(mongoUrl, mongoOptions);
        connection = mongoose.connections[0];
        console.log('Mongo Connect: DB Successfully Connected...');
        connection.on('error', console.error.bind(console, 'connection error:'));
        return connection.getClient();
    }
    catch (err) {
        console.log(`Error connecting to MongoDB:\n${err}`);
        throw err;
    }
};
exports.client = client;
//# sourceMappingURL=mongodb.js.map