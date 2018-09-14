import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextInput from '../../../../containers/TextInput'
import SelectOptions from '../../../../containers/SelectOptions'
import actions from '../../../../modules/actions'

class ItemAdd extends Component {

  state = {
    item: {
        name: '',
        description: '',
        category: 'choose',
        price: '',
        quantity: '',
        image: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(actions.foods.getAllCategories())
  }

  handleChange = (e) => {
    if(e.target.name === 'image') {
      let image = e.target.files[0]
      let form = new FormData()
      form.append('image', image)
      this.setState({
         image: form,
      })
    }

    this.setState({
      item: { ...this.state.item, [e.target.name]: e.target.value }
    })
  }

  addItem = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    actions.foods.addItem(data)
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
            <SelectOptions name='category' label="Category" defVal={item.category} opt={this.props.categories} action={this.handleChange.bind(this)} />
						<TextInput name='price' label='Price' type='number' defVal={item.price} action={this.handleChange.bind(this)} />
						<TextInput name='quantity' label='Quantity' type='number' defVal={item.quantity} action={this.handleChange.bind(this)} />
            <input
              type="file"
              name="image"
              onChange={this.handleInputChange}
              style={{display: "none"}}
              ref={(fileInput) => this.fileInput = fileInput}
            />

						<div className='col-5 offset-md-3 button button-controls'>
              <button type="button" className='btn' onClick={() => this.fileInput.click()}>Upload image</button>
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

export default connect(mapStateToProps)(ItemAdd) 