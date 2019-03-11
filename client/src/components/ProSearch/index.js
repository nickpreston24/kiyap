import React, { Component } from 'react'
import ProCard from './ProCard'
import SearchBar from './SearchBar'
import ProList from './ProList';
import API from '../../utils/API';
import { proData } from './sampleData.js'

class Store {

    professionals = proData

    clearList() {
        this.professionals = []
    }

    addProfessional (pro) {
        this.professionals.push(pro);
    }

    loadPros () {
        API.getPros()
        // .then(res=> this.setState({professionals:res.data}))
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
    }

}

const store = new Store();


export default class ProSearch extends Component {

    state = {
        professionals: proData,
        search: "",
        keyName: "owner"
    }

    componentDidMount(){
        this.loadPros();
    }

    loadPros= ()=>{
        API.getPros()
        // .then(res=> this.setState({professionals:res.data}))
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err));
    }

    removePro = id => {
        const remaining = this.state.professionals.filter(p=>p.id!==id);
        console.log('remaining: ', remaining)
        this.setState({professionals: remaining});
    }

    onSearch = text => {
        let pros = this.state.professionals;
        console.log('searched for: ', text);

        this.setState({search: text});
        // console.log('pros:', pros)

        const remaining = pros.filter(p=>{
            console.log('key:', p[this.state.keyName])
            return p[this.state.keyName].includes(text)
        })

        // console.log('rem: ', remaining);
        this.setState({professionals: remaining, keyName:"teaches"});

    }

    render() {
        return (
            <div className='container'>
                <h1>Professionals Search</h1>
                <h2>Filter Professionals</h2>
                <ProList>
                    <SearchBar onSearch={this.onSearch}></SearchBar>
                        <h3>Professionals found:</h3>
                        {this.state.professionals
                            .map(pro => (
                                <ProCard
                                    {...pro}
                                    removePro={this.removePro}
                                    key={pro.id}/>))}
                </ProList>
            </div>
        )
    }
}


