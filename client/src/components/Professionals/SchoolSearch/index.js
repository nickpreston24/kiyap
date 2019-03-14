import React, { Component } from 'react'
import SchoolCard from '../Cards'
import { observer } from 'mobx-react';

class SchoolList extends Component {
    render() {
      const { store } = this.schoolps
    //   console.log('received store: ', store);
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
    //   const name = schoolmpt("School name:")
    //   const location = schoolmpt("School name:")
    //   this.schoolps.store.locations.push({ name, location })
    // }

    clearList = () => {
      this.schoolps.store.clear();
    }

    render() {
      return (<div className="controls">
        <button onClick={this.clearList}>clear</button>
        {/* <button onClick={this.addSchool}>add schoolfessional</button> */}
      </div>)
    }
  }

/**
 * Searches for Schools (Schools) using a Google Map
 * Schoolfessionals are selected by
 */
export default class SchoolSearch extends Component {

    constructor(schoolps){
        super(schoolps);
        this.store = schoolps.store;
    }
    onSearch = text => {

    }

    render() {
        return (
            <div>
                <h1>Schools Found</h1>
                {/* <SearchBar onSearch={this.onSearch}></SearchBar> */}
                <Controls store={this.store}/>
                <SchoolList store={this.store}/>
            </div>
        )
    }
}


// export default class SchoolSearch extends Component {

//     state = {
//         locations: schoolData,
//         search: "",
//         keyName: "owner"
//     }

//     componentDidMount(){
//         this.loadSchools();
//     }

//     loadSchools= ()=>{
//         API.getSchools()
//         // .then(res=> this.setState({locations:res.data}))
//         .then(res=>console.log(res.data))
//         .catch(err=>console.log(err));
//     }

//     removeSchool = id => {
//         const remaining = this.state.locations.filter(p=>p.id!==id);
//         console.log('remaining: ', remaining)
//         this.setState({locations: remaining});
//     }

//     onSearch = text => {
//         let schools = this.state.locations;
//         console.log('searched for: ', text);

//         this.setState({search: text});
//         // console.log('schools:', schools)

//         const remaining = schools.filter(p=>{
//             console.log('key:', p[this.state.keyName])
//             return p[this.state.keyName].includes(text)
//         })

//         // console.log('rem: ', remaining);
//         this.setState({locations: remaining, keyName:"teaches"});

//     }

//     render() {
//         return (
//             <div className='container'>
//                 <h1>Schoolfessionals Search</h1>
//                 <h2>Filter Schoolfessionals</h2>
//                 <SchoolList>
//                     <SearchBar onSearch={this.onSearch}></SearchBar>
//                         <h3>Schoolfessionals found:</h3>
//                         {this.state.locations
//                             .map(school => (
//                                 <SchoolCard
//                                     {...school}
//                                     removeSchool={this.removeSchool}
//                                     key={school.id}/>))}
//                 </SchoolList>
//             </div>
//         )
//     }
// }


