import React, { Component } from 'react'
import { connect } from 'react-redux';

import Item from './Item';
import actions from '../../../modules/actions';
import Icons from '../../../containers/Icons';
import { FaPlus } from 'react-icons/fa';

class Items extends Component {

	state = {
		searchTerm: '',
		currentlyDisplayed: []
	}

	componentDidMount() {
		this.props.dispatch(actions.foods.getAllItems())
		.then(() => this.setState({ currentlyDisplayed: this.props.items }))
		.catch(err => console.log(err))
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({ searchTerm: '', currentlyDisplayed: this.props.items })
        }
    }

	deleteItem = (id) => {
		this.props.dispatch(actions.foods.deleteItem(id))
	}

	editItem = (id) => {
		this.props.history.push(`/food/items/edit/${id}`)
	}
    
  onInputChange = (e) => {
		let filteredItems = this.props.items.filter(
			(item) => item.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		this.setState({
			searchTerm: e.target.value,
			currentlyDisplayed: filteredItems
		})
	}

  render() {
	const tableRows = ['Name', 'Description', 'Category', 'Price', 'Action']
	
	return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Item Management</h6>
            <button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/food/items/add')}>
                <Icons size={14} color="white"><FaPlus /></Icons>Add Item
            </button>
        </div>
        <div className="card-body">
            <div className='card-control'>
                <span>Show <select><option>25</option></select> entries</span>
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
                        this.state.currentlyDisplayed.map(i => 
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
