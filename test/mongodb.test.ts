import { expect } from 'chai'
import * as mongoDb from '../src/mongodb'
import mongodb from 'mongodb'

describe('mongoDb', () => {
    it('connections to db succesfully', () => {
        return mongoDb.client()
            .then((results: mongodb.MongoClient) => {
                expect(results).to.be.a('object')
                results.close()
            })
    })

})
