import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../modules/actions';

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
      <div>
        <form onSubmit={this.submitEditedCustomer}>
          <input type='text' name='fname' defaultValue={customer.fname} onChange={this.handleChange} />
          <input type='text' name='lname' defaultValue={customer.lname} onChange={this.handleChange} />
          <input type='email' name='email' defaultValue={customer.email} onChange={this.handleChange} />
          <input type='phone' name='phone' defaultValue={customer.phone} onChange={this.handleChange} />

          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {

	}
}

export default connect(mapStateToProps)(CustomerEdit) 