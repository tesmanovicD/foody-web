import React, { Component } from 'react'
import { connect } from 'react-redux'

import actions from '../../../../modules/actions'
import SelectOptions from '../../../../containers/SelectOptions'
import TextInput from '../../../../containers/TextInput'

class ItemEdit extends Component {

  state = {
    item: ''
  }

	getItem = (id) => {
    actions.foods.getSingleItem(id)
    .then(item => this.setState({ item }))
  }

  handleChange = (e) => {
    this.setState({
      item: {...this.state.item, [e.target.name]: e.target.value}
    })
  }

  submitEditedItem = (e) => {
    e.preventDefault()
    actions.foods.editItem(this.props.match.params.id, this.state.item)
    .then(() => this.props.history.push('/food/items'))
  }
  
  componentDidMount() {
    this.getItem(this.props.match.params.id)
    this.props.dispatch(actions.foods.getAllCategories())
  }

  render() {
    const { item } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Edit Item</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedItem}>
          <TextInput name='name' label='Name' defVal={item.name} action={this.handleChange.bind(this)} />
          <TextInput name='description' label='Description' defVal={item.description} action={this.handleChange.bind(this)} />
          <SelectOptions name='category' label="Category" defVal={item.category} opt={this.props.categories} action={this.handleChange.bind(this)} />
          <TextInput name='price' label='Price' defVal={item.price} action={this.handleChange.bind(this)} />
          <TextInput name='quantity' label='Quantity' type='number' defVal={item.quantity} action={this.handleChange.bind(this)} />
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
    categories: state.foods.categories
	}
}

export default connect(mapStateToProps)(ItemEdit) 