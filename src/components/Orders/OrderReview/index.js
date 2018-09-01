import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import actions from '../../../modules/actions'
import TextInput from '../../../containers/TextInput'

class OrderReview extends Component {

  state = {
    order: null,
    isDisabled: true
  }

  getOrder = (id, status) => {
    this.props.dispatch(actions.orders.getOrder(id))
    .then(order => {
      const isDisabled = status === 'completed' ? true : false
      this.setState({ 
        order: {...order, 
                date: moment.unix(order.date).format('YYYY-MM-DD'), 
                end_date: moment.unix(order.end_date).format('YYYY-MM-DD')
               },
        isDisabled 
      })
    })
    .catch(err => {
      alert(`No order with ID ${id}`)
      this.props.history.push('/orders')
    })
  }

  componentDidMount() {
    const status = this.props.location.state ? this.props.location.state.status : 'changeMe'
    this.getOrder(this.props.match.params.id, status)
  }

  render() {
    const { order } = this.state
    const { isDisabled } = this.state
    return (
      <section>
      {this.state.order ?
      <div className="card">
        <div className="card-header">
          <h6 className="card-title">Review Order</h6>
        </div>
        <div className="card-body">
        <form onSubmit={this.submitEditedCustomer}>
          <TextInput name='fname' label='First Name' defVal={order.fname} disabled />
          <TextInput name='lname' label='Last Name' defVal={order.lname} disabled />
          <TextInput name='price' type='number' label='Price' defVal={order.price} disabled />
          <TextInput name='orderDate' type='date' label='Order Date' defVal={order.date} disabled  />
          <TextInput name='pickupDate' type='date' label='Pickup Date' defVal={order.pickup_date} disabled={isDisabled} />
          <TextInput name='status' label='Status' defVal={order.status} disabled />
          <div className='col-sm-9 offset-md-3'>
            <button type='submit' className='btn btn-purple btn-loading'>Submit</button>
          </div>
        </form>
        </div>
      </div>
      :
      <div>cnageme</div>
      }
      </section>
    )
  }
}

export default connect()(OrderReview)
