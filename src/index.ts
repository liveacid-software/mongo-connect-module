import * as mongodb from './mongodb'
import session from './session'

export default {
    client: mongodb.client,
    session: session.session()
};