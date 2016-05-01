import React, { Component } from 'react'
import {login, logout} from './login-decorator'

@login()
export default class SmallComponent extends Component {
  static propTypes = {
    textContents: React.PropTypes.string,
  }

  render () {
    return (
      <div className='span3'>
        <h1>
          {this.props.textContents}
        </h1>
      </div>
    )
  }
}
