import React from 'react'
import { withAuthorization, AuthUserContext } from '../Session'
import { MapWithASearchBox } from '../Maps';
import { SchoolSearch } from '../Professionals';
import { LocationStore } from '../Stores';
import { withFlexColumn, withFlexRow } from '../Flex';
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core';

const store = new LocationStore();

const styles = theme => ({
    root: {
        background: `linear-gradient(to bottom, ${'#ffe8bd'} 30% , ${theme.palette.primary.dark} 80%)`,
        width: '100vw',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    content: {
        minWidth: 900,
        maxWidth: 900,
        // height: '100%',
        // flexFlow: 'columb nowrap',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        // color: 'red',
        // border: '2px solid red',
        overflow: 'visible',
    },
    maps: {
        borderRadius: 8,
        padding: 20,
        boxSizing: 'border-box',
        boxShadow: '1px 3px 9px 0px rgba(0,0,0,0.4)',
        margin: '20px 10px'
    }
})

const HomePage = ({ classes }) => (
    <div className={classes.root}>
        <div className={classes.content}>
            <Card className={classes.maps}>
                <MapWithASearchBox store={store} />
            </Card>
            <SchoolSearch store={store} />
        </div>
    </div>
);

// const HomePage = () =>
//     <AuthUserContext.Consumer>
//         {authUser =>
//             <div>
//                 <HomeContents studentId={authUser.uid}></HomeContents>
//             </div>
//         }
//     </AuthUserContext.Consumer>;

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

export default withAuthorization(condition)(withStyles(styles)(HomePage));