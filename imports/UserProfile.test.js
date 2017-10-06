/*
import React from 'react';
import { shallow } from 'enzyme';

import UserProfile from './UserProfile.jsx';
 
describe('Profile', () => {

    beforeEach(() => {
        const profile = shallow(<UserProfile />);
    });

    it('should have a name', () => {
        expect(profile.state().name.length()).toBeGreaterThan(0);
    });

    it('should have user details', () => {
        expect(profile.state().about.length()).toBeGreaterThan(0);
    });

    it('should have at least one tag', () => {
        expect(profile.state().tags.length).toBeGreaterThan(0);
    });

    // Address test

    it('should have an address', () => {
        expect(profile.state().address.street.length().toBeGreaterThan(0));
        expect(profile.state().address.city.length().toBeGreaterThan(0));
        expect(profile.state().address.zipcode.length().toBeGreaterThan(0));
    });

});