import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import Reset from './Reset.jsx';

import { assert } from 'chai';

describe('Reset', () => {
    it('should have input area', () => {
        const reset = mount(<Reset />);

        assert(reset.find('input'));
    });
    it('should type in the form when requring email', () => {
        const reset = mount(<Reset />);
        const input = reset.find('input');

        input.instance.value = 'kouj@purdue.edu';
        assert.equal(input.instance.value, 'kouj@purdue.edu');
    });
});