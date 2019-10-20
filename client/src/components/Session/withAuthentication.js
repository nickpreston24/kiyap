import React from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {

    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);
            this.state = { authUser: null,};
        }

        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props}/>
                </AuthUserContext.Provider>
            );
        }

        componentDidMount () {
            const { auth } = this.props.firebase;
            if(!auth || !auth.onAuthStateChanged) return;

            this.listener = auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            });
        }

        componentWillUnmount() {
            if(this.listener)
                this.listener();
        }

    }

    return withFirebase(WithAuthentication);
}

export default withAuthentication;