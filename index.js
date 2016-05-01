require("./node_modules/bootstrap/dist/css/bootstrap.min.css")
import React from 'react'
import ReactDOM from 'react-dom'
import SmallComponent from './small-component'
import LargeComponent from './large-component'
import {login, logout} from './login-decorator'

export class App extends React.Component {
  render() {
    return (
      <div>
        <div>Complicated React + Babel + Bootstrap + Webpack</div>
        <button onClick={logout}>Logout</button>
        <div className='row'>
          <SmallComponent textContents='I am small' />
          <LargeComponent textContents='I am large' />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.querySelector("#myApp"))
