import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';

import Order from './Order'

class Orders extends Component {

	state = {
		searchTerm: '',
		currentlyDisplayed: []
	}

	componentDidMount() {
		this.props.dispatch(actions.orders.getAllOrders())
		.then(() => this.setState({ currentlyDisplayed: this.props.orders }))
		.catch(err => console.log(err))

		console.log(this.props.orders)
	}

	componentDidUpdate(prevProps) {
		if (this.props.orders !== prevProps.orders) {
			this.setState({ searchTerm: '', currentlyDisplayed: this.props.orders })
		}
	}

	deleteEmployee = (id) => {
		this.props.dispatch(actions.orders.deleteOrder(id))
	}

	reviewOrder = (id, status) => {
		this.props.history.push({
			pathname: `/orders/review/${id}`,
			state: { status }
		})
	}

	onInputChange = (e) => {
		let filteredOrders = this.props.orders.filter(
			(order) => order.foodName.toLowerCase().includes(e.target.value.toLowerCase())
		)
		this.setState({
			searchTerm: e.target.value,
			currentlyDisplayed: filteredOrders
		})
	}

  render() {
	const tableRows = ['Customer Name', 'Price', 'Order Date', 'Pickup date(approx)', 'Status', 'Action']

    return (
			<div className="card">
			<div className="card-header">
					<h6 className="card-title">Order Management</h6>
					<div className="clearfix"></div>
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
							this.state.currentlyDisplayed.map(o => <Order key={o.id} order={o} deleteOrder={this.deleteOrder} reviewOrder={this.reviewOrder} />)
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
		orders: state.orders.orders
	}
}

export default connect(mapStateToProps)(Orders)
