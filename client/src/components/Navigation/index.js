import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = () => (
    <ul className="navigation">
      {/* <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li> */}
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {/* <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li> */}
      <li>
        <SignOutButton />
      </li>
    </ul>
  );

  const NavigationNonAuth = () => (
    <ul className="navigation">
      <li>
        {/* Home is an alias for the landing page (non-Auth) */}
        <Link to={ROUTES.LANDING}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );

export default Navigation;