import React, { Component } from 'react'
import {login, logout} from './login-decorator'

@login()
export default class LargeComponent extends Component {
  static propTypes = {
    textContents: React.PropTypes.string,
  }

  render () {
    return (
      <div className='span9 last'>
        <h1>
          {this.props.textContents}
        </h1>
      </div>
    )
  }
}
