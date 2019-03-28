import React from 'react'
import { withAuthorization, AuthUserContext } from '../Session'
import { MapWithASearchBox } from '../Maps';
import { SchoolSearch } from '../Professionals';
import { LocationStore } from '../Stores';

const HomePage = () =>
    <AuthUserContext.Consumer>
        {authUser =>
            <div>
                <HomeContents studentId={authUser.uid}></HomeContents>
            </div>
        }
    </AuthUserContext.Consumer>;

const HomeContents = ({studentId}) => {

    const store = new LocationStore({studentId});

    return(
        <>
            <MapWithASearchBox store={store}/>
            <SchoolSearch store={store}/>
        </>
    )
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);