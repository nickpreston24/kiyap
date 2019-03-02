import React from 'react'
// import PropTypes from 'prop-types'
import SearchBar from './SearchBar'

const FilterTable = props => {
    function getInitialState() {
        return {filterText :'testing 123'}
    }
  return (
    <div>
      <SearchBar filterText={this.state.filterText}/>
      <Table professionals={this.props.professionals}/>
    </div>
  )
}

function Table({professionals}) {
  return (
    <div>
      <table>
          <tr>
              
          </tr>
      </table>
    </div>
  )
}


export default FilterTable