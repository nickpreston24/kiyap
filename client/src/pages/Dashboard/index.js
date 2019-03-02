/**
 * TODO:
 * 1) Create a Dashboard container class that handles the basic operations a user can use.
 * 2) Subcomponents will handle individual tasks
 * (TODO: post 3/2/19:) create a View abstraction, index.js, etc like in here: https://medium.com/styled-components/component-folder-pattern-ee42df37ec68
 * 3) Make Dashboard a Layout component (React Patterns)
 * 4) Make Dashboard resusable for Professionals as well.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Dashboard extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}
