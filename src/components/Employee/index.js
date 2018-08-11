import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';
import Worker from './Worker'

class Employee extends Component {

	state = {
		loaded: false
	}

	componentDidMount() {
		this.props.dispatch(actions.employee.getAllEmployee())
		.then(() => this.setState({ loaded: true }))
		.catch(err => console.log(err))
	}

	deleteEmployee = (id) => {
		// this.props.dispatch(actions.customers.deleteCustomer(id))
	}

	editEmployee = (id) => {
		this.props.history.push(`/employee/edit/${id}`)
	}

  render() {
    return (
			<div className="card">
			<div className="card-header">
					<h6 className="card-title">Employee Management</h6>
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
							<td>Username</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{this.state.loaded &&
							this.props.employee.employee.map(e => <Worker key={e.id} employee={e} deleteEmployee={this.deleteEmployee} editEmployee={this.editEmployee} />)
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
		employee: state.employee
	}
}

export default connect(mapStateToProps)(Employee)
