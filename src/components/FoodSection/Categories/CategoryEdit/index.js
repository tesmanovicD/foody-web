import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../../../modules/actions';
import TextInput from '../../../../containers/TextInput';

class CategoryEdit extends Component {

  state = {
    category: ''
  }

	getCategory = (id) => {
    actions.foods.getSingleCategory(id)
    .then(category => this.setState({ category }))
  }

  handleChange = (e) => {
    this.setState({
      category: {...this.state.category, [e.target.name]: e.target.value}
    })
  }

  submitEditedCategory = (e) => {
    e.preventDefault()
    actions.foods.editCategory(this.props.match.params.id, this.state.category)
    .then(() => this.props.history.push('/food/categories'))
  }
  
  componentDidMount() {
    this.getCategory(this.props.match.params.id)
  }

  render() {
    const { category } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Edit Category</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedCategory}>
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

export default connect(mapStateToProps)(CategoryEdit) 