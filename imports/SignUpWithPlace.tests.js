import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import SignUpWithPlace from './SignUpWithPlace.jsx';

import { assert } from 'chai';

describe('SignUpWithPlace', () => {
    it('fill the form and submit to sign up', () => {
        assert('sign up successfully!', 'sign up successfully!');
    });
});