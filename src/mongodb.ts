/**
 * Mongoose Helper
 */
import * as mongoose from 'mongoose'
import * as url from 'url'
import config from './config'
import * as mongodb from 'mongodb'
let connection: mongoose.Connection

export const client = async () => {
    if (connection) {
        console.log('connection reused: ')
        return connection.getClient() as mongodb.MongoClient
    }
    try {

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
        } = config.mongodb

        const auth = username ? `${username}:${password}` : undefined
        const host = port ? `${hostname}:${port}` : hostname
        const pathname = database
        const search = params ? `?${params}` : ''

        const mongoUrl = url.format({
            protocol: protocol,
            slashes: true,
            auth,
            host,
            pathname,
            search
        })

        const mongoOptions = {
            useUnifiedTopology: true,
            ssl,
            sslValidate: ssl,
        } as mongoose.ConnectOptions

        if (ssl) {
            mongoOptions.sslCA = Buffer.from(ca!, 'base64').toString('ascii')
        }

        mongoose.set('strictQuery', true)
        console.log('Mongo Connect URL: ', mongoUrl)

        console.log('Mongo Connect: Connecting to MongoDB...')
        connection = await mongoose.createConnection(mongoUrl, mongoOptions).asPromise()
        console.log('Mongo Connect: DB Successfully Connected...')

        return connection.getClient() as mongodb.MongoClient

    } catch (err) {
        console.log(`Error connecting to MongoDB:\n${err}`)
        throw err
    }
}



