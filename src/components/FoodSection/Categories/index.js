import React, { Component } from 'react'
import { connect } from 'react-redux';

import Category from './Category';
import actions from '../../../modules/actions';
import Icons from '../../../containers/Icons';
import { FaPlus } from 'react-icons/fa';

class Categories extends Component {

	state = {
		searchTerm: '',
		currentlyDisplayed: []
	}

	componentDidMount() {
		this.props.dispatch(actions.foods.getAllCategories())
		.then(() => this.setState({ currentlyDisplayed: this.props.categories }))
		.catch(err => console.log(err))
	}

	componentDidUpdate(prevProps) {
		if (this.props.categories !== prevProps.categories) {
			this.setState({ searchTerm: '', currentlyDisplayed: this.props.categories })
		}
	}

	deleteCategory = (id) => {
		this.props.dispatch(actions.foods.deleteCategory(id))
	}

	editCategory = (id) => {
		this.props.history.push(`/food/categories/edit/${id}`)
	}

	onInputChange = (e) => {
		let filteredCategories = this.props.categories.filter(
			(category) => category.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		this.setState({
			searchTerm: e.target.value,
			currentlyDisplayed: filteredCategories
		})
	}

  render() {
	const tableRows = ['Name', 'Description', 'Action']
	
	return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Category Management</h6>
            <button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/food/categories/add')}>
				<Icons size={14} color="white"><FaPlus /></Icons>Add Category
			</button>
        </div>
        <div className="card-body">
					<div className='card-control'>
						<span>Show <select>
							<option>25</option>
							<option>50</option>
						</select> entries</span>
						<span>Search: <input type='text' value={this.state.searchTerm} onChange={this.onInputChange} /> </span>
					</div>

					<table className='table table-stripped'>
						<thead>
							<tr className='table-active'>
								{tableRows.map((rowName, key) => <td key={key}>{rowName}</td>)}
							</tr>
						</thead>
						<tbody>
							{this.state.currentlyDisplayed.length ?
								this.state.currentlyDisplayed.map(c => 
                                    <Category key={c.id} category={c} deleteCategory={this.deleteCategory} editCategory={this.editCategory} />)
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
		categories: state.foods.categories
	}
}

export default connect(mapStateToProps)(Categories)
