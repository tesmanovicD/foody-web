import React, { Component } from 'react'
import { connect } from 'react-redux'

import TextInput from '../../../../containers/TextInput'
import SelectOptions from '../../../../containers/SelectOptions'
import actions from '../../../../modules/actions'

class CouponAdd extends Component {

  state = {
    coupon: {
        code: '',
        discountType: 'choose',
        discount: '',
        usageLimit: '',
        startDate: '',
        endDate: '',
        status: 'choose'
    }
  }

  handleChange = (e) => {
    this.setState({
      coupon: { ...this.state.coupon, [e.target.name]: e.target.value }
    })
  }

  addCoupon = (e) => {
    e.preventDefault()
		actions.coupons.addCoupon(this.state.coupon)
    .then(() => this.props.history.push('/coupons'))
  }

  render() {
		const { coupon } = this.state
		const discountOpt = [{ name: 'Percentage', value: 'percentage' }, { name: 'Fixed', value: 'fixed' }]
		const statusOpt = [{ name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }]
  
    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Add Coupon</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.addCoupon}>
          <TextInput name='code' label='Code' defVal={coupon.code} action={this.handleChange.bind(this)} />	
					<SelectOptions name='discountType' label='Discount Type' defVal={coupon.discountType} opt={discountOpt} action={this.handleChange.bind(this)} />
          <TextInput name='discount' type='number' label='Discount' defVal={coupon.discount} action={this.handleChange.bind(this)} />
          <TextInput name='usageLimit' label='Usage Limit' defVal={coupon.usageLimit} action={this.handleChange.bind(this)} />
          <TextInput name='startDate' type='date' label='Start Date' defVal={coupon.startDate} action={this.handleChange.bind(this)} />
          <TextInput name='endDate' type='date' label='End Date' defVal={coupon.endDate} action={this.handleChange.bind(this)} />
					<SelectOptions name='status' label='Status' defVal={coupon.status} opt={statusOpt} action={this.handleChange.bind(this)} />          
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

export default connect(mapStateToProps)(CouponAdd) 