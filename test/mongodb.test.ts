import { expect } from 'chai'
import { mongodb as mongoDb } from '../src'
import { session } from '../src'
import mongodb from 'mongodb'
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const UserSchema = mongoose.Schema(
    {
        created: Date,
        createdBy: { type: ObjectId, ref: 'User' },
        updated: Date,
        updatedBy: { type: ObjectId, ref: 'User' },
        password: String,
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        type: { type: String, enum: ['admin', 'user'] },
        first_name: String,
        last_name: String,
        phone: String,
        company_name: String,
        job_title: String,
        physical_address1: String,
        physical_address2: String,
        city: String,
        state: String,
        zip_code: String,
        resetPasswordToken: String,
        resetPasswordExpires: Date,
        emailPreference: String,
        apiToken: String,
        deactivated: Boolean,
    },
    {
        timestamps: true,
    }
);

describe('mongoDb', () => {
    it('connections to db succesfully', () => {
        return mongoDb.client()
            .then((results: mongodb.MongoClient) => {
                expect(results).to.be.a('object')
                const User = mongoose.model('User', UserSchema);
                return User.findOne({ email: 'develop@liveacid.com' })
                    .then((user: any) => {
                        expect(user).to.be.a('object')
                        results.close()
                    })

            })
    })

})


describe('session', () => {
    it('returns session object', () => {
        const s = session.session
        console.log('s', s())
    })

})
