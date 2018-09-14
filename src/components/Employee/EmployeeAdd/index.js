import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'

import actions from '../../../modules/actions'
import TextInput from '../../../containers/TextInput'

class EmployeAdd extends Component {

  state = {
    employee: {
        fname: '',
        lname: '',
        username: '',
        password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      employee: { ...this.state.employee, [e.target.name]: e.target.value }
    })
  }

  AddEmployee = (e) => {
    e.preventDefault()
    actions.employee.addEmployee(this.state.employee)
    .then(() => this.props.history.push('/employee'))
    .catch(err => toastr.error(err.data))
  }

  render() {
    const { employee } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Add Employee</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.AddEmployee}>
          <TextInput name='fname' label='First Name' defVal={employee.fname} action={this.handleChange.bind(this)} />
          <TextInput name='lname' label='Last Name' defVal={employee.lname} action={this.handleChange.bind(this)} />
          <TextInput name='username' label='Username' defVal={employee.username} action={this.handleChange.bind(this)} />
          <TextInput name='password' label='Password' type='password' defVal={employee.password} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(EmployeAdd) 