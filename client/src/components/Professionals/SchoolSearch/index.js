import React, { Component } from 'react'
import SchoolCard from '../Cards'
import { observer } from 'mobx-react';

class SchoolList extends Component {
    render() {
      const { store } = this.props
      console.log('received store: ', store);
      return (
            <div className='wrapper'>
                {store.locations
                    .map(school => (
                        <SchoolCard
                            {...school}
                            // removeSchool={store.removeSchool}
                            key={school._id}/>))}
            </div>
        )
    }
}

SchoolList = observer(SchoolList)

class Controls extends Component {

    // addSchool = () => {
    //   const name = prompt("School name:")
    //   const location = prompt("School name:")
    //   this.props.store.locations.push({ name, location })
    // }

    clearList = () => {
      this.props.store.clear();
    }

    render() {
      return (<div className="controls">
        <button onClick={this.clearList}>clear</button>
        {/* <button onClick={this.addSchool}>add professional</button> */}
      </div>)
    }
  }

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
                <h1>Schools Found</h1>
                {console.log(this.store)}
                <Controls store={this.store}/>
                <SchoolList store={this.store}/>
            </div>
        )
    }
}

