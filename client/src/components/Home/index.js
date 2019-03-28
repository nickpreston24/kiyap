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

const condition = authUser => !!authUser;

export default withAuthorization(condition)(withStyles(styles)(HomePage));