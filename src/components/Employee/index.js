import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';
import Worker from './Worker'

class Employee extends Component {

	componentDidMount() {
		this.props.dispatch(actions.employee.getAllEmployee())
		.then(() => this.setState({ loaded: true }))
		.catch(err => console.log(err))
	}

	deleteEmployee = (id) => {
		this.props.dispatch(actions.employee.deleteEmployee(id))
	}

	editEmployee = (id) => {
		this.props.history.push(`/employee/edit/${id}`)
	}

  render() {
	const tableRows = ['Customer Name', 'Username', 'Action']

    return (
			<div className="card">
			<div className="card-header">
					<h6 className="card-title">Employee Management</h6>
					<button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/employee/add')}>Add Employee</button>
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
						{this.props.employee.length ?
							this.props.employee.map(e => <Worker key={e.id} employee={e} deleteEmployee={this.deleteEmployee} editEmployee={this.editEmployee} />)
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
