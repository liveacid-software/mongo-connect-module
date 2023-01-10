/**
 * Mongoose Helper
 */
import * as mongoose from 'mongoose'
import * as url from 'url'
import config from './config'
import * as mongodb from 'mongodb'
import * as fs from 'fs'


let connection: any

export const client = () => {
    if (connection) {
        return Promise.resolve(connection)
    }
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
        ssl,
        sslValidate: ssl
    } as mongoose.ConnectOptions

    if (ssl) {
        const fileData = `-----BEGIN CERTIFICATE-----\n${Buffer.from(ca!, 'base64').toString('ascii')}\n-----END CERTIFICATE-----\n`
        fs.writeFileSync('rootCA.pem', fileData)
        mongoOptions.sslCA = `./rootCA.pem`
    }

    mongoose.set('strictQuery', false)
    console.log('Mongo Connect URL: ', mongoUrl)

    console.log('Mongo Connect: Connecting to MongoDB...')
    return mongoose.connect(mongoUrl, mongoOptions)
        .then(() => {
            connection = mongoose.connections[0]
            connection.on('error', console.error.bind(console, 'connection error:'));
            console.log('Mongo Connect: DB Successfully Connected...')
            return connection.getClient() as mongodb.MongoClient

        }).catch((error: any) => {
            console.log('Mongo Connection Error: ', error.message)
            throw error
        })


}

