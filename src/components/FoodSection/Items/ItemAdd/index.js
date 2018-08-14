import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextInput from '../../../../containers/TextInput'
import actions from '../../../../modules/actions'

class ItemAdd extends Component {

  state = {
    item: {
        name: '',
        description: '',
        category: '',
        price: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    })
  }

  addItem = (e) => {
    e.preventDefault()
    actions.foods.addItem(this.state.item)
    .then(() => this.props.history.push('/food/items'))
  }

  render() {
    const { item } = this.state
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Add Item</h6>
        </div>
        <div className="card-body">
					<form onSubmit={this.addItem}>
						<TextInput name='name' label='Name' defVal={item.name} action={this.handleChange.bind(this)} />
						<TextInput name='description' label='Description' defVal={item.description} action={this.handleChange.bind(this)} />
						{/* <select>
							<option value='default'>- choose -</option>

						</select> */}
						<TextInput name='price' label='Price' type='number' defVal={item.price} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(ItemAdd) 