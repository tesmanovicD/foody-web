import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../modules/actions'
class Login extends Component {

	state = {
		username: '',
		password: '',
		usernameErr: '',
		passwordErr: '',
		formValid: false
	}

	handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})

		if (e.target.value.length === 0) {
			this.setState({
				[`${e.target.name}Err`] : `* required field`
			})
		} else {
			this.setState({
				[`${e.target.name}Err`] : ``
			})
		}
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
			<section className="image-logo">
				<img src="/images/foody_logo.png" className="img-fluid" alt="Foody Logo" />
			</section>

			<section className="user-info">
				<form onSubmit={this.handleLogin} className="col-6">
					<div className='form-group offset-2'>
						<input type='text'placeholder='Enter your username' name='username' onChange={this.handleInputChange} 
							className={`form-control ${this.state.usernameErr && 'err-border'}`} />
						<span className='username-err err-message'>{this.state.usernameErr}</span>
					</div>

					<div className='form-group offset-2'>
						<input type='password' placeholder='Enter your password' name='password' onChange={this.handleInputChange}
							className={`form-control ${this.state.passwordErr && 'err-border'}`} />
						<span className='password-err err-message'>{this.state.passwordErr}</span>
					</div>

					<div className='form-group offset-2'>
						<button type='submit' className='btn btn-success btn-right'>Login</button>						
					</div>
				</form>
			</section>
      </div>
    )
  }
}

export default connect()(Login)
