import React, { Component } from 'react'
import School from '../../Mui/School'
import { observer } from 'mobx-react';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import {Column, Row} from 'simple-flexbox';

class SchoolList extends Component {

        state = {
            search: '',
            // schools: [],
        }

        onFilterChange = (event) => {
            let search = event.target.value;
            console.log('searched for:', search)
            if (event.target.value) {
                this.setState({search})
            } else {
                this.setState({search: ''})
            }

            //Filter out the schools found, not those saved.

            // this.setState({schools:this.props.store.locations
            //     .map(s=>s.Name!==search)})
        }

        clearList = () => {
            this.props.store.clear();
          }


        render(){
            const { store } = this.props
            console.log('lolcations: ', store.locations)
            return (

                <Column flexGrow={1}>

                    {store.locations ? (
                        <div>

                            <Row horizontal='center'>
                                <h1>Search Results</h1>
                            </Row>

                            <Row horizontal='center'>

                                <div>
                                    <TextField style={{padding:24}}
                                    id="filterInput"
                                    placeholder="Filter Schools"
                                    margin="normal"
                                    onChange={this.onFilterChange}>

                                    </TextField>
                                    {/* TODO: Line up with textfield */}
                                    <button onClick={this.clearList}>clear</button>

                                </div>
                            </Row>

                            <Row vertical='center'>

                                <Grid container spacing={24} style={{padding:24}}>
                                    {store.locations.map(location =>(
                                        <School {...location}
                                        key={location._id}/>
                                    ))}
                                </Grid>

                            </Row>
                        </div>
                    ): "Search for locations on the map"}

                    {store.schools ? (

                        <div>
                            <Column flexGrow={1} horizontal='center'>
                                <h1>Your Picks</h1>
                                <div>
                                    <Grid container spacing={24} style={{padding:24}}>
                                    {store.schools
                                        .map(school => (
                                            <School {...school}
                                            key={school._id}/>
                                        ))}
                                    </Grid>
                                </div>
                            </Column>
                        </div>

                    ): "No Schools found"}

                </Column>
        )
    }
}

SchoolList = observer(SchoolList)

// class Controls extends Component {

//     clearList = () => {
//         this.props.store.clear();
//       }

//     render() {
//       return (<div className="controls">
//         <button onClick={this.clearList}>clear</button>
//         {/* <button onClick={this.addSchool}>add professional</button> */}
//       </div>)
//     }
//   }

/**
 * Searches for Schools using a Google Map
 * Professionals are selected by location
 */
export default class SchoolSearch extends Component {

    constructor(props){
        super(props);
        this.store = props.store;
    }
    onSearch = text => {

    }

    render() {
        return (
            <div>
                {/* {console.log(this.store)} */}
                {/* <Controls store={this.store}/> */}
                <SchoolList store={this.store}/>
            </div>
        )
    }
}

