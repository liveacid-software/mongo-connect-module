import MongoStore from 'connect-mongo';
import expressSession from 'express-session'
import * as mongodb from './mongodb'
import config from './config'

export const session = () => {
    return expressSession({
        secret: config.session.secret,
        resave: config.session.resave,
        saveUninitialized: config.session.saveUninitialized,
        store: MongoStore.create({
            collectionName: config.session.collection,
            clientPromise: mongodb.client()
        }),
        cookie: {
            maxAge: config.session.maxAge,
            sameSite: 'lax',
            httpOnly: true,
            secure: config.NODE_ENV === 'development',
        },
    });
}
