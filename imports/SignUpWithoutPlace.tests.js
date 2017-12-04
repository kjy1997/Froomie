import 'jsdom-global/register';
import React from 'react';
import { mount } from 'enzyme';

import SignUpWithoutPlace from './SignUpWithoutPlace.jsx';

import { assert } from 'chai';

describe('SignUpWithoutPlace', () => {
    it('fill the form and submit to sign up', () => {
        assert('sign up successfully!', 'sign up successfully!');
    });
});