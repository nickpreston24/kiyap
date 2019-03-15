import React from 'react'
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { AuthUserContext, withAuthorization } from '../Session';
import {withFlexColumn, withFlexRow} from '../Flex';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                {/* <h1>Account: {authUser.email}</h1> */}
                <h1>Reset or change your password</h1>
                <PasswordForgetForm/>
                <PasswordChangeForm/>
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withFlexColumn(withFlexRow(AccountPage)))