import React, { Component } from 'react'
import { connect } from 'react-redux';

import Category from './Category';
import actions from '../../../modules/actions';

class Categories extends Component {

	componentDidMount() {
		this.props.dispatch(actions.foods.getAllCategories())
		.catch(err => console.log(err))
	}

	deleteCategory = (id) => {
		this.props.dispatch(actions.foods.deleteCategory(id))
	}

	editCategory = (id) => {
		this.props.history.push(`/food/categories/edit/${id}`)
	}

  render() {
	const tableRows = ['Name', 'Description', 'Action']
	
	return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Category Management</h6>
            <button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/food/categories/add')}>Add Category</button>
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
							{this.props.categories.length ?
								this.props.categories.map(c => 
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
