import React from 'react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => (
    <li onClick={firebase.doSignOut}>
        <Link to={ROUTES.LANDING}>Sign Out</Link>
    </li>
)

export default withFirebase(SignOutButton);