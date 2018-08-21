import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import actions from '../../../../modules/actions'
import TextInput from '../../../../containers/TextInput'
import SelectOptions from '../../../../containers/SelectOptions'


class CouponEdit extends Component {

  state = {
    coupon: ''
  }

	getCoupon = (id) => {
    actions.coupons.getSingleCoupon(id)
    .then(coupon => this.setState({ 
        coupon: {
            code: coupon.code,
            discount: coupon.discount,
            enabled: coupon.enabled,
            endDate: moment.unix(coupon.end_date).format("YYYY-MM-DD"),
            startDate: moment.unix(coupon.start_date).format("YYYY-MM-DD"),
            discountType: coupon.type,
            usageLimit: coupon.usage_limit,
						usedCoupons: coupon.used_coupons,
						status: coupon.status
        }
    }))
  }

  handleChange = (e) => {
    this.setState({
      coupon: {...this.state.coupon, [e.target.name]: e.target.value}
    })
  }

  submitEditedCoupon = (e) => {
    e.preventDefault()
    actions.coupons.editCoupon(this.props.match.params.id, this.state.coupon)
    .then(() => this.props.history.push('/coupons'))
  }
  
  componentDidMount() {
    this.getCoupon(this.props.match.params.id)
  }

  render() {
    const { coupon } = this.state
		const discountOpt = [{ name: 'Percentage', value: 'percentage' }, { name: 'Fixed', value: 'fixed' }]
		const statusOpt = [{ name: 'Active', value: 'active' }, { name: 'Inactive', value: 'inactive' }]

    return (
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Edit Coupon</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedCoupon}>
          <TextInput name='code' label='First Name' defVal={coupon.code} action={this.handleChange.bind(this)} />
					<SelectOptions name='discountType' label='Discount Type' defVal={coupon.discountType} opt={discountOpt} action={this.handleChange.bind(this)} />					
          <TextInput name='discount' label='Discount' defVal={coupon.discount} action={this.handleChange.bind(this)} />
          <TextInput name='usageLimit' label='Usage Limit' defVal={coupon.usageLimit} action={this.handleChange.bind(this)} />
          <TextInput name='usedCoupons' label='Used Coupons' defVal={coupon.usedCoupons} action={this.handleChange.bind(this)} />
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

export default connect(mapStateToProps)(CouponEdit) 