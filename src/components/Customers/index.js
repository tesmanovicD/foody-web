import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FaPlus } from 'react-icons/fa'
import toastr from 'toastr'

import actions from '../../modules/actions'
import Customer from './Customer/Customer'
import Icons from '../../containers/Icons'

class Customers extends Component {

	state = {
		searchTerm: '',
		currentlyDisplayed: []
	}

	componentDidMount() {
		this.props.dispatch(actions.customers.getAllCustomers())
		.then(() => this.setState({ currentlyDisplayed: this.props.customers }))
		.catch(err => toastr.error(err.data))
	}
	
	componentDidUpdate(prevProps) {
		if (this.props.customers !== prevProps.customers) {
			this.setState({ searchTerm: '', currentlyDisplayed: this.props.customers })
		}
	}

	deleteCustomer = (id) => {
		this.props.dispatch(actions.customers.deleteCustomer(id))
	}

	editCustomer = (id) => {
		this.props.history.push(`/customers/edit/${id}`)
	}

	onInputChange = (e) => {
		let filteredCustomers = this.props.customers.filter(
			(customer) => customer.fname.toLowerCase().includes(e.target.value.toLowerCase())
		)
		this.setState({
			searchTerm: e.target.value,
			currentlyDisplayed: filteredCustomers
		})
	}

  render() {
	const tableRows = ['Customer Name', 'Email', 'Phone', 'Action']

    return (
		<div className="card">
			<div className="card-header">
				<h6 className="card-title">Customer Management</h6>
				<button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/customers/add')}>
					<Icons size={14} color="white"><FaPlus /></Icons>Add Customer
				</button>
			</div>
			<div className="card-body">
				<div className='card-control'>
					<span>Show <select>
						<option>25</option>
						<option>50</option>
					</select> entries</span>
					<span>Search: <input type='text' value={this.state.searchTerm} onChange={this.onInputChange} placeholder="firstname" />
					</span>
				</div>

				<table className='table table-stripped'>
					<thead>
						<tr className='table-active'>
							{tableRows.map((rowName, key) => <td key={key}>{rowName}</td>)}
						</tr>
					</thead>
					<tbody>
						{this.state.currentlyDisplayed.length ?
							this.state.currentlyDisplayed.map(c => <Customer key={c.id} customer={c} deleteCustomer={this.deleteCustomer} editCustomer={this.editCustomer} />)
							:
							<tr className='table-props'>
								<td colSpan={tableRows.length} className='text-center'>No data available in table</td>
							</tr>
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
		customers: state.customers.customers
	}
}

export default connect(mapStateToProps)(Customers)
