import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';

import Worker from './Worker'
import Icons from '../../containers/Icons';
import { FaPlus } from 'react-icons/fa';


class Employee extends Component {

	state = {
		searchTerm: '',
		currentlyDisplayed: []
	}

	componentDidMount() {
		this.props.dispatch(actions.employee.getAllEmployee())
		.then(() => this.setState({ currentlyDisplayed: this.props.employee }))
	}

	deleteEmployee = (id) => {
		this.props.dispatch(actions.employee.deleteEmployee(id))
	}

	editEmployee = (id) => {
		this.props.history.push(`/employee/edit/${id}`)
	}

	onInputChange = (e) => {
		let filteredEmployee = this.props.employee.filter(
			(employee) => employee.username.toLowerCase().includes(e.target.value.toLowerCase())
		)
		this.setState({
			searchTerm: e.target.value,
			currentlyDisplayed: filteredEmployee
		})
	}

  render() {
	const tableRows = ['Customer Name', 'Username', 'Action']

    return (
			<div className="card">
			<div className="card-header">
					<h6 className="card-title">Employee Management</h6>
					<button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/employee/add')}>
						<Icons size={14} color="white"><FaPlus /></Icons>Add Employee
					</button>
			</div>
			<div className="card-body">
				<div className='card-control'>
					<span>Show <select><option>25</option></select> entries</span>
					<span>Search: <input type='text' onChange={this.onInputChange} value={this.state.searchTerm} /> </span>
				</div>

				<table className='table table-stripped'>
					<thead>
						<tr className='table-active'>
							{tableRows.map((rowName, key) => <td key={key}>{rowName}</td>)}
						</tr>
					</thead>
					<tbody>
						
						{this.state.currentlyDisplayed.length ?
							this.state.currentlyDisplayed.map(e => <Worker key={e.id} employee={e} deleteEmployee={this.deleteEmployee} editEmployee={this.editEmployee} />)
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
		employee: state.employee.employee
	}
}

export default connect(mapStateToProps)(Employee)
