import { Mongo } from 'meteor/mongo';

export const Places = new Mongo.Collection('places');

Places.schema = new SimpleSchema({
    address: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: Number},
    type: {type: String},
    rooms: {type: [Number]},
    bathrooms: {type: Number},
    amenities: {type: [String]},
    utilities: {type: [String]},
    preferredGender: {type: String}
});