import React from 'react'
import { withAuthorization } from '../Session'
import { MapWithASearchBox } from '../Maps';
import { SchoolSearch } from '../Professionals';
import { LocationStore } from '../Stores';
import { withFlexColumn, withFlexRow } from '../Flex';
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core';

const store = new LocationStore();

const styles = theme => ({
    root: {
        display: 'flex',
        minWidth: '100%',
        maxWidth: '100%',
        height: '100%',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        color: 'red',
        // border: '2px solid red',
        overflow: 'hidden',
    },
    sidebar: {
        // margin: '40px 0px',
        // borderRadius: '8px 0px 0px 8px',
        display: 'flex',
        background: theme.palette.primary.main,
        width: 400,
        color: 'red',
        // border: '2px solid green',
        overflow: 'scroll',
    },
    content: {
        flexShrink: 1,
        width: 'calc(100% - 400px)',
        color: 'red',
        padding: '40px 40px 0px 40px',
        // border: '2px solid blue',
        overflow: 'scroll',
    },
    maps: {
        borderRadius: 8,
        padding: 20,
        boxSizing: 'border-box',
        boxShadow: '5px 5px 23px 0px rgba(0,0,0,0.25)',
        margin: '0px 20px'
    }
})

const HomePage = ({ classes }) => (
    <div className={classes.root}>
        <div className={classes.content}>
            <Card className={classes.maps}>
                <MapWithASearchBox store={store}  />
            </Card>
            <SchoolSearch store={store} />
        </div>
        <div className={classes.sidebar}>
            <h1>Hello!</h1>
        </div>
    </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withStyles(styles)(HomePage));