import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';

import Order from './Order'

class Orders extends Component {

	componentDidMount() {
		this.props.dispatch(actions.orders.getAllOrders())
		.then(() => this.setState({ loaded: true }))
		.catch(err => console.log(err))
	}

	deleteEmployee = (id) => {
		this.props.dispatch(actions.orders.deleteOrder(id))
	}

	editOrder = (id) => {
		this.props.history.push(`/orders/edit/${id}`)
	}

  render() {
	const tableRows = ['Food Name', 'Customer Name', 'Quantity', 'Price', 'Order Date', 'Pickup date(approx)', 'Action']

    return (
			<div className="card">
			<div className="card-header">
					<h6 className="card-title">Order Management</h6>
					<div className="clearfix"></div>
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
						{this.props.orders.length ?
							this.props.orders.map(o => <Order key={o.id} order={o} deleteOrder={this.deleteOrder} editOrder={this.editOrder} />)
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
