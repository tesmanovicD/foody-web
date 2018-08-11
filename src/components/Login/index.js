import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../modules/actions'
class Login extends Component {

	state = {
		username: '',
		password: ''
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleLogin = (e) => {
		const { username, password } = this.state
		e.preventDefault();
		this.props.dispatch(actions.users.authenticateUser(username, password))
		.then(() => this.props.history.push('/'))
		.catch(err => console.log(err))
		
	}

  render() {
    return (
    	<div>
				<h3>Admin Login</h3>
    		<form onSubmit={this.handleLogin}>
					<div className='form-control'>
						<input type='text' placeholder='Enter your username' name='username' onChange={this.handleInputChange} />
						<span className='username-err'>err</span>
					</div>

					<div className='form-control'>
						<input type='password' placeholder='Enter your password' name='password' onChange={this.handleInputChange} />
						<span className='password-err'>err</span>
					</div>

					<button type='submit' className='btn btn-success'>Login</button>
        </form>
      </div>
    )
  }
}

export default connect()(Login)
