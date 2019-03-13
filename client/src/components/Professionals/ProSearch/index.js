import React, { Component } from 'react'
import ProCard from '../ProCard'
import SearchBar from './SearchBar'
// import ProList from './ProList';
import API from '../../../utils/API'
import { proData } from './sampleData.js'
import { decorate, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react';

class ProStore {

    constructor() {
        this.professionals = []
        this.loadPros()
    }

    clear() {
        this.professionals = []
    }

    addProfessional (pro) {
        this.professionals.push(pro);
    }

    upvote (pro) {
        // TODO: 'Upvote' indicates user's interest in a school.
    }

    loadPros () {
        API.getPros()
        .then(res=>{
            let data = res.data;
            console.log('data: ', data)
            this.professionals=data;
        })
        .catch(err=>console.log(err));
    }
}

decorate(ProStore, {
    professionals: observable,
    clear: action,
    addProfessional: action,
    loadPros: action,
    removePro: action,
})

const proStore = new ProStore();
// store.loadPros();
// console.log('prostore: ', store.professionals);

class ProList extends Component {
    render() {
      const { store } = this.props
      console.log('received store: ', store);
      return (
            <div className='wrapper'>
                {store.professionals
                    .map(pro => (
                        <ProCard
                            {...pro}
                            // removePro={store.removePro}
                            key={pro._id}/>))}
            </div>
        )
    }
}

ProList = observer(ProList)

class Controls extends Component {

    addPro = () => {
      const name = prompt("Pro name:")
      const location = prompt("School name:")
      this.props.store.professionals.push({ name, location })
    }

    clearList = () => {
      this.props.store.clear();
    }

    render() {
      return (<div className="controls">
        <button onClick={this.clearList}>clear</button>
        <button onClick={this.addPro}>add professional</button>
      </div>)
    }
  }


  export default class ProSearch extends Component {

    onSearch = text => {

    }

    render() {
        return (
            <div>
                <h1>Mobx Pro List</h1>
                <SearchBar onSearch={this.onSearch}></SearchBar>
                <Controls store={proStore}/>
                <ProList store={proStore}/>
            </div>
        )
    }
}


// export default class ProSearch extends Component {

//     state = {
//         professionals: proData,
//         search: "",
//         keyName: "owner"
//     }

//     componentDidMount(){
//         this.loadPros();
//     }

//     loadPros= ()=>{
//         API.getPros()
//         // .then(res=> this.setState({professionals:res.data}))
//         .then(res=>console.log(res.data))
//         .catch(err=>console.log(err));
//     }

//     removePro = id => {
//         const remaining = this.state.professionals.filter(p=>p.id!==id);
//         console.log('remaining: ', remaining)
//         this.setState({professionals: remaining});
//     }

//     onSearch = text => {
//         let pros = this.state.professionals;
//         console.log('searched for: ', text);

//         this.setState({search: text});
//         // console.log('pros:', pros)

//         const remaining = pros.filter(p=>{
//             console.log('key:', p[this.state.keyName])
//             return p[this.state.keyName].includes(text)
//         })

//         // console.log('rem: ', remaining);
//         this.setState({professionals: remaining, keyName:"teaches"});

//     }

//     render() {
//         return (
//             <div className='container'>
//                 <h1>Professionals Search</h1>
//                 <h2>Filter Professionals</h2>
//                 <ProList>
//                     <SearchBar onSearch={this.onSearch}></SearchBar>
//                         <h3>Professionals found:</h3>
//                         {this.state.professionals
//                             .map(pro => (
//                                 <ProCard
//                                     {...pro}
//                                     removePro={this.removePro}
//                                     key={pro.id}/>))}
//                 </ProList>
//             </div>
//         )
//     }
// }


