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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * App Config
 *
 * Wrapper object around env vars loaded by dotenv.
 */
const dotenv = __importStar(require("dotenv"));
const { error } = dotenv.config();
if (error) {
    throw error;
}
const config = {
    mongodb: {
        username: process.env.MONGODB_USERNAME,
        password: process.env.MONGODB_PASSWORD,
        protocol: process.env.MONGODB_PROTOCOL,
        hostname: process.env.MONGODB_HOSTNAME,
        params: process.env.MONGODB_PARAMS,
        port: process.env.MONGODB_PORT,
        database: process.env.MONGODB_DATABASE,
        ssl: process.env.MONGODB_SSL ? true : false,
        ca: process.env.MONGODB_CA_CERT,
    },
    session: {
        secret: process.env.SESSION_SECRET,
        maxAge: parseInt(process.env.SESSION_MAX_AGE, 10),
        collection: process.env.SESSION_COLLECTION || 'sessions',
        resave: !!process.env.SESSION_RESAVE || false,
        saveUninitialized: !!process.env.SESSION_SAVE_UNINITIALIZED || false,
    },
    NODE_ENV: process.env.NODE_ENV,
};
exports.default = config;
//# sourceMappingURL=config.js.map