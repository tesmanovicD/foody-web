import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../../modules/actions'
import TextInput from '../../../containers/TextInput'

class CustomerAdd extends Component {

  state = {
    customer: {
        fname: '',
        lname: '',
        email: '',
        phone: '',
        password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      customer: { ...this.state.customer, [e.target.name]: e.target.value }
    })
  }

  AddCustomer = (e) => {
    e.preventDefault()
    actions.customers.addCustomer(this.state.customer)
    .then(() => this.props.history.push('/customers'))
  }

  render() {
    const { customer } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Add Customer</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.AddCustomer}>
          <TextInput name='fname' label='First Name' defVal={customer.fname} action={this.handleChange.bind(this)} />
          <TextInput name='lname' label='Last Name' defVal={customer.lname} action={this.handleChange.bind(this)} />
          <TextInput name='email' type="email" label='Email' defVal={customer.email} action={this.handleChange.bind(this)} />
          <TextInput name='phone' label='Phone' defVal={customer.phone} action={this.handleChange.bind(this)} />
          <TextInput name='password' label='Password' type='password' defVal={customer.password} action={this.handleChange.bind(this)} />
          <div className='col-sm-9 offset-md-3'>
            <button type='submit' className='btn btn-purple btn-loading'>Submit</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps)(CustomerAdd) 