import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';
import Customer from './Customer/Customer';

class Customers extends Component {

	state = {
		loaded: false
	}

	componentDidMount() {
		this.props.dispatch(actions.customers.getAllCustomers())
		.then(() => this.setState({ loaded: true }))
		.catch(err => console.log(err))
	}

	deleteCustomer = (id) => {
		this.props.dispatch(actions.customers.deleteCustomer(id))
	}

	editCustomer = (id) => {
		this.props.history.push(`/customers/edit/${id}`)
	}

  render() {
    return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Customer Management</h6>
            <div className="clearfix"></div>
        </div>
        <div className="card-body">
					<div className='card-control'>
						<span>Show <select><option>25</option></select> entries</span>
						<span>Search: <input type='text' /> </span>
					</div>

					<table className='table table-stripped'>
						<thead>
							<tr className='table-active'>
								<td>Customer Name</td>
								<td>Email</td>
								<td>Phone</td>
								<td>Action</td>
							</tr>
						</thead>
						<tbody>
							{this.state.loaded &&
								this.props.customers.customers.map(c => <Customer key={c.id} customer={c} deleteCustomer={this.deleteCustomer} editCustomer={this.editCustomer} />)
							}
						</tbody>
					</table>
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		customers: state.customers
	}
}

export default connect(mapStateToProps)(Customers)
