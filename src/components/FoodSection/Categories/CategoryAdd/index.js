import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextInput from '../../../../containers/TextInput'
import actions from '../../../../modules/actions'

class CategoryAdd extends Component {

  state = {
    category: {
        name: '',
        description: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      category: { ...this.state.category, [e.target.name]: e.target.value }
    })
  }

  addCategory = (e) => {
    e.preventDefault()
    actions.foods.addCategory(this.state.category)
    .then(() => this.props.history.push('/food/categories'))
  }

  render() {
    const { category } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Add Category</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.addCategory}>
          <TextInput name='name' label='Name' defVal={category.name} action={this.handleChange.bind(this)} />
          <TextInput name='description' label='Description' defVal={category.description} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(CategoryAdd) 