import React, { Component } from 'react';
import { decorate, observable } from "mobx"
import { observer } from "mobx-react"
// import './style.css'
class Store {
  employeesList = [
    { name: "John Doe", salary: 150 },
    { name: "Richard Roe", salary: 225 },
  ]
}

decorate(Store, {
  employeesList: observable
})

const employeeStore = new Store()

const Row = (props) => {
  return (<tr>
    <td>{props.data.name}</td>
    <td>{props.data.salary}</td>
  </tr>)
}

class Table extends Component {
  render() {
    const { store } = this.props
    return (<table>
      <thead>
        <tr>
          <td>Name:</td>
          <td>Daily salary:</td>
        </tr>
      </thead>
      <tbody>
        {store.employeesList.map((e, i) =>
          <Row
            key={i}
            data={e}
          />
        )}
      </tbody>
    </table>)
  }
}
Table = observer(Table)


class Controls extends Component {
  addEmployee = () => {
    const name = prompt("The name:")
    const salary = parseInt(prompt("The salary:"), 10)
    this.props.store.employeesList.push({ name, salary })
    // ERROR !!! this will not update the view
  }

  clearList = () => {
    this.props.store.employeesList = []
    // ERROR !!! this will not update the view
  }

  render() {
    return (<div className="controls">
      <button onClick={this.clearList}>clear table</button>
      <button onClick={this.addEmployee}>add record</button>
    </div>)
  }
}

class MobxTable extends Component {
  render() {
    return (
      <div>
        <h1>Mobx Table</h1>
        <Controls store={employeeStore} />
        <Table store={employeeStore} />
      </div>
    )
  }
}

export default MobxTable;