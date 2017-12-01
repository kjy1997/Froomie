import React from 'react';
import { mount } from 'enzyme';

import Reset from './Reset.jsx';

import { assert } from 'chai';

describe('Reset', () => {
    it('should have input area', () => {
        const Reset = mount(<Reset />);

        assert(Reset.find('input'));
    });
    it('should type in the form when requring email', () => {
        const Reset = mount(<Reset />);

        // simulate type in input
        Reset.find('input').simulate('change', {
            target: {
                value: 'kouj@purdue.edu'
            }
        });

        assert.equal(Reset.find('input').value, 'kouj@purdue.edu');
    });
});