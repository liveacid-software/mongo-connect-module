import * as mongodb from './mongodb'
import session from './session'

export = {
    client: mongodb.client,
    session: session.session()
};