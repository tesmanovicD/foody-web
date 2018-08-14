import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';
import Customer from './Customer/Customer';

class Customers extends Component {

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
	const tableRows = ['Customer Name', 'Email', 'Phone', 'Action']

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
							{tableRows.map((rowName, key) => <td key={key}>{rowName}</td>)}
						</tr>
					</thead>
					<tbody>
						{this.props.customers.length ?
							this.props.customers.map(c => <Customer key={c.id} customer={c} deleteCustomer={this.deleteCustomer} editCustomer={this.editCustomer} />)
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
