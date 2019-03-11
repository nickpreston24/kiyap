import React, {Component} from 'react'
import { decorate, observable, action} from 'mobx';
import { observer } from 'mobx-react';

// *** Counter Example from egghead

const counterState = observable({
    count : 5
})

counterState.increment = function(){
    // console.log('incr()')
    this.count++;
    console.log(this.count)
}

counterState.decrement = function(){
    // console.log('decr()')
    this.count--;
    console.log(this.count)
}

export default class Counter extends Component {

    render() {
        return (
            <div>
            {console.log('i am called')}
                Counter: {counterState.count} <br/>
                <button onClick={this.handleDec}>-</button>
                <button onClick={this.handleInc}>+</button>
            </div>
        )
    }

    handleInc = () => {
        // console.log('clicked inc')
        counterState.increment();
        // console.log(this.props.store)
    }
    handleDec = () => {
        // console.log('clicked dec')
        counterState.decrement();
    }
}

decorate(Counter, {
    // count: observable,
    handleInc: action.bound,
    handleDec: action.bound,
}, observer)
console.log('cs: ', counterState);