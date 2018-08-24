import React, { Component } from 'react'
import actions from '../../modules/actions';
import { connect } from 'react-redux';

import Coupon from './Coupon';
import Icons from '../../containers/Icons';
import { FaPlus } from 'react-icons/fa';

class Coupons extends Component {

	componentDidMount() {
		this.props.dispatch(actions.coupons.getAllCoupons())
		.then(() => this.setState({ loaded: true }))
		.catch(err => console.log(err))
	}

	deleteCoupon = (id) => {
		this.props.dispatch(actions.coupons.deleteCoupon(id))
	}

	editCoupon = (id) => {
		this.props.history.push(`/coupons/edit/${id}`)
	}

  render() {
	const tableRows = ['Code', 'Discount Type', 'Discount', 'Usage Limit', 'Used Coupons', 'End Date', 'Enable/Disable', 'Action']
	
	return (
			<div className="card">
        <div className="card-header">
            <h6 className="card-title">Coupon Management</h6>
            <button className='btn btn-primary btn-sm' onClick={() => this.props.history.push('/coupons/add')}>
				<Icons size={14} color="white"><FaPlus /></Icons>Add Coupon
			</button>
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
							{this.props.coupons.length ?
								this.props.coupons.map(c => <Coupon key={c.id} coupon={c} deleteCoupon={this.deleteCoupon} editCoupon={this.editCoupon} />)
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
		coupons: state.coupons.coupons
	}
}

export default connect(mapStateToProps)(Coupons)
