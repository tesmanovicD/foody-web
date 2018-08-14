import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../modules/actions';
import TextInput from '../../../containers/TextInput';

class EmployeeEdit extends Component {

  state = {
    employee: ''
  }

	getEmployee = (id) => {
    actions.employee.getSingleEmployee(id)
    .then(employee => this.setState({ employee }))
  }

  handleChange = (e) => {
    this.setState({
      employee: {...this.state.employee, [e.target.name]: e.target.value}
    })
  }

  submitEditedEmployee = (e) => {
    e.preventDefault()
    actions.employee.editEmployee(this.props.match.params.id, this.state.employee)
    .then(() => this.props.history.push('/employee'))
  }
  
  componentDidMount() {
    this.getEmployee(this.props.match.params.id)
  }

  render() {
    const { employee } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Edit Employee</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedEmployee}>
          <TextInput name='fname' label='First Name' defVal={employee.fname} action={this.handleChange.bind(this)} />
          <TextInput name='lname' label='Last Name' defVal={employee.lname} action={this.handleChange.bind(this)} />
          <TextInput name='username' label='Username' defVal={employee.username} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(EmployeeEdit) 