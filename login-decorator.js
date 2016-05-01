import React, { Component } from 'react'
import LoadingState from './loading-state'
import ErrorState from './error-state'
import Firebase from 'firebase'

const ref = new Firebase('https://gitvotes.firebaseio.com/')

export function login () {
  return function (UIComponent) {
    return class Login extends Component {
      constructor (props, context) {
        super(props, context)
        this.state = {
          loading: true,
          error: false,
          token: localStorage.getItem('token'),
          githubAccessToken: localStorage.getItem('githubAccessToken'),
        }
      }

      componentDidMount () {
        this.authenticate(this.props)
      }

      authenticate = () => {
        const {token, githubAccessToken} = this.state
        const p = (token && githubAccessToken) ? ref.authWithCustomToken(token) : ref.authWithOAuthPopup('github')
        p.then((authData) => {
          const {token, github} = authData
          const githubAccessToken = (github && github.accessToken) || localStorage.getItem('githubAccessToken')
          localStorage.setItem('token', token)
          localStorage.setItem('githubAccessToken', githubAccessToken)
          this.setState({ error: false, loading: false, token: token, githubAccessToken: githubAccessToken })
        })
        .catch((err) => {
          console.error('error:', err.stack)
          this.setState({ error:true, loading: false })
        })
      }

      render () {
        const { error, loading } = this.state

        if (error) { return <ErrorState /> }
        if (loading) { return <LoadingState /> }

        const propsForComponent = {...this.props, githubAccessToken: this.state.githubAccessToken}

        return (<UIComponent {...propsForComponent} />)
      }
    }
  }
}

export function logout () {
  ref.unauth()
  localStorage.removeItem('token')
  localStorage.removeItem('githubAccessToken')
}
