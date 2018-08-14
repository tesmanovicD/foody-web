import React, { Component } from 'react'
import { connect } from 'react-redux';

import Item from './Item';
import actions from '../../../modules/actions';

class Items extends Component {

	componentDidMount() {
		this.props.dispatch(actions.foods.getAllItems())
		.catch(err => console.log(err))
	}

	deleteItem = (id) => {
		this.props.dispatch(actions.foods.deleteItem(id))
	}

	editItem = (id) => {
		this.props.history.push(`/food/items/edit/${id}`)
	}

  render() {
	const tableRows = ['Name', 'Description', 'Category', 'Price', 'Action']
	
	return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Item Management</h6>
            <button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/food/items/add')}>Add Item</button>
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
                    {this.props.items.length ?
                        this.props.items.map(i => 
                            <Item key={i.id} item={i} deleteItem={this.deleteItem} editItem={this.editItem} />)
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
		items: state.foods.items
	}
}

export default connect(mapStateToProps)(Items)
