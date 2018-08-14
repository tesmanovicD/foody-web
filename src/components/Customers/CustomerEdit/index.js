import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../modules/actions';
import TextInput from '../../../containers/TextInput';

class CustomerEdit extends Component {

  state = {
    customer: ''
  }

	getCustomer = (id) => {
    actions.customers.getSingleCustomer(id)
    .then(customer => this.setState({ customer }))
  }

  handleChange = (e) => {
    this.setState({
      customer: {...this.state.customer, [e.target.name]: e.target.value}
    })
  }

  submitEditedCustomer = (e) => {
    e.preventDefault()
    actions.customers.editCustomer(this.props.match.params.id, this.state.customer)
    .then(() => this.props.history.push('/customers'))
  }
  
  componentDidMount() {
    this.getCustomer(this.props.match.params.id)
  }

  render() {
    const { customer } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Edit Customer</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedCustomer}>
          <TextInput name='fname' label='First Name' defVal={customer.fname} action={this.handleChange.bind(this)} />
          <TextInput name='lname' label='Last Name' defVal={customer.lname} action={this.handleChange.bind(this)} />
          <TextInput name='email' type='email' label='Email' defVal={customer.email} action={this.handleChange.bind(this)} />
          <TextInput name='phone' type='phone' label='Phone' defVal={customer.phone} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(CustomerEdit) 