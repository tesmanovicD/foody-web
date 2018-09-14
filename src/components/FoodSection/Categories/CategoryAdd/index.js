import React, { Component } from 'react'
import { connect } from 'react-redux'
import toastr from 'toastr'

import TextInput from '../../../../containers/TextInput'
import actions from '../../../../modules/actions'

class CategoryAdd extends Component {

  state = {
    category: {
        name: '',
        description: '',
        image: ''
    }
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
      category: { ...this.state.category, [e.target.name]: e.target.value }
    })
  }

  addCategory = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    actions.foods.addCategory(data)
    .then(() => this.props.history.push('/food/categories'))
    .catch(err => toastr.error(err.data))
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

	}
}

export default connect(mapStateToProps)(CategoryAdd) 