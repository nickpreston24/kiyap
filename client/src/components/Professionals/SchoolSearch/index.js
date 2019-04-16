import React, { Component } from 'react'
import School from '../../Mui/School'
import { observer } from 'mobx-react';
// import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { Column } from 'simple-flexbox';
import { withFlexRow } from '../../Flex';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Button, Typography, Icon } from '@material-ui/core';
import { toJS } from 'mobx';

const styles = theme => ({
    root: {
        // color: 'red',
    },
    backdrop: {
        margin: 20,
        marginTop: 50,
        height: 500,
        width: '100vw',
        overflow: 'visible',
        marginBottom: 120,
        // width: 900,
        // border: '1px solid lime',
        background: theme.palette.primary.main,
    },
    panel: {
        // color: 'red',
        transition: 'left 0.7s cubic-bezier(0.950, 0.050, 0.795, 0.035)',
        left: 'calc(calc(calc(100vw - 900px) / 2) + 10px)',
        boxShadow: '1px 3px 9px 0px rgba(0,0,0,0.4)',
        position: 'relative',
        background: 'white',
        // overflowY: 'scroll',
        // overflowX: 'visible',
        borderRadius: 6,
        height: 600,
        width: 600,
        top: -50,
        zIndex: 0,
        '&.active': {
            left: 'calc(calc(calc(100vw - 900px) / 2) + 290px)',
        }
    },
    toggleLeft: {
        color: 'white',
        transform: 'translateY(-50%)',
        position: 'absolute',
        top: '50%',
        boxSizing: 'border-box',
        padding: 20,
        left: -280,
        width: 280,
        height: 500,
        zIndex: 1,
        opacity: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        '& > * ': { margin: 20 },
        '& button': { borderRadius: 24, borderWidth: 2, },
        transition: 'opacity 0.3s linear 0.0s !important',
        'div.active > &': {
            opacity: 1,
            transition: 'opacity 0.5s linear 0.5s !important',
        },
    },
    toggleRight: {
        color: 'white',
        transform: 'translateY(-50%)',
        position: 'absolute',
        top: '50%',
        boxSizing: 'border-box',
        padding: 20,
        left: 600,
        width: 280,
        height: 500,
        zIndex: 2,
        opacity: 0,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        '& > * ': { margin: 20 },
        '& button': { borderRadius: 24, borderWidth: 2, },
        transition: 'opacity 0.3s linear 0.0s !important',
        'div:not(.active) > &': {
            opacity: 1,
            transition: 'opacity 0.5s linear 0.5s !important',
        },
    },
    icon: {
        boxSizing: 'border-box',
        width: 200,
        fontSize: 48,
        textAlign: 'center'
    },
    expand: {
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'scroll',
    }
})

class SchoolList extends Component {

    state = {
        search: '',
        toggle: false,
        // schools: [],
    }

    onFilterChange = (event) => {
        let search = event.target.value;
        console.log('searched for:', search)
        if (event.target.value) {
            this.setState({ search })
        } else {
            this.setState({ search: '' })
        }

        //Filter out the schools found, not those saved.

        // this.setState({schools:this.props.store.locations
        //     .map(s=>s.Name!==search)})
    }

    clearList = () => {
        this.props.store.clear();
    }

    togglePanel = () => {
        this.setState({ toggle: !this.state.toggle })
    }


    render() {
        const { store, classes } = this.props
        const { toggle } = this.props.store
        const { togglePanel } = this.props.store
        console.log(toJS(this.props.store))
        // console.log('photos', store.locations.map(l=>l.photos))
        return (

            // <Column flexGrow={1}>
            <div className={classes.root} >
                <div className={classes.backdrop}>
                    <div className={classNames(classes.panel, toggle && 'active')}>
                        {!toggle &&
                            <div className={classes.expand}>
                                {store.locations ? (
                                    <YourFinds locations={store.locations} store={store} />
                                ) : "Search for locations on the map"}
                            </div>
                        }
                        {toggle &&
                            <div className={classes.expand}>
                                {store.schools ? (
                                    <YourPicks schools={store.schools} store={store} />
                                ) : "No Schools found"}
                            </div>
                        }
                        <ToggleSchools className={classes.toggleLeft} {...{ togglePanel }} />
                        <ToggleFinds className={classes.toggleRight} {...{ togglePanel }} />
                    </div>
                </div>
            </div>
            // </Column>
        )
    }
}

const ToggleFinds = withStyles(styles)(({ togglePanel, classes }) => (
    <div className={classes.toggleRight} onClick={togglePanel}>
        <Icon className={classNames(classes.icon, 'far fa-heart')} />
        <Typography color="inherit" variant="h5">See your favorite locations!</Typography>
        <Button
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
            onClick={togglePanel}
        >
            View Picks
        </Button>
    </div>
))

const ToggleSchools = withStyles(styles)(({ togglePanel, classes }) => (
    <div className={classes.toggleLeft} onClick={togglePanel}>
        <Icon className={classNames(classes.icon, 'far fa-map')} />
        <Typography color="inherit" variant="h5">Find new and exciting locations!</Typography>
        <Button
            variant="outlined"
            style={{ color: 'white', borderColor: 'white' }}
            onClick={togglePanel}
        >
            See Results
        </Button>
    </div>
))

SchoolList = withStyles(styles)(observer(SchoolList))


function YourFinds({ locations, store }) {

    // const locs = locations.slice();
    // console.log('sliced locations: ', locs.slice());

    function onLike(id) {
        store.saveSchool(id);
    }

    function onDislike(id) {
        store.removeLocation(id);
    }

    return (

        <Column flexGrow={1} horizontal='center'>
            <Typography variant="h4" color="primary" style={{ margin: 24 }}>Search Results</Typography>
            <Grid container spacing={24} style={{ padding: 24 }}>
                {locations.map(location => (
                    <School {...location}
                        onDislike={onDislike}
                        onLike={onLike}
                        // image={'https://dummyimage.com/640x360/fff/aaa'}
                        key={location.place_id} />
                ))}
            </Grid>
        </Column>
    )
}

function YourPicks ({schools, store}) {

    function removeSchool(id) {
        store.removeSchool(id)
    }

    return (
        <Column flexGrow={1} horizontal='center'>
            <Typography variant="h4" color="primary" style={{ margin: 24 }}>My Favorites</Typography>
            <Grid container spacing={24} style={{ padding: 24 }}>
                {schools
                    .map(school => (
                        <School {...school}
                            onRemove={removeSchool}
                            key={school.name} />
                    ))}
            </Grid>
        </Column>
    )
}

/**
 * Searches for Schools using a Google Map
 * Professionals are selected by location
 */
export default withFlexRow(class SchoolSearch extends Component {

    constructor(props) {
        super(props);
        this.store = props.store;
    }

    onSearch = text => {

    }

    render() {
        return (
            <div>
                <SchoolList store={this.store} />
            </div>
        )
    }
})