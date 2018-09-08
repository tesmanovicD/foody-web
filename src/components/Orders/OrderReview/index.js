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

  getOrder = (id) => {
    this.props.dispatch(actions.orders.getOrder(id))
    .then(order => {
      const isDisabled = order.status === 'Completed' || order.status === 'Canceled' || order.status === 'Ready' ? true : false
      this.setState({ 
        order: {
          ...order, 
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

  acceptOrder = (e) => {
    e.preventDefault();
    const { order } = this.state
    //Get current date and add 20min on it
    const pickupDate = moment().add(20,'m').format('YYYY-MM-DD hh:mm:ss')

    this.props.dispatch(actions.orders.acceptOrder(order.id, pickupDate, order.id_customer, order.order_no))
    .then(() => {
      this.getOrder(this.props.match.params.id)
    })
    .catch(err => console.log(err))
  }

  handleChange = (e) => {
    this.setState({
      order: {
        ...this.state.order,
        end_date: e.target.value
      }
    })
  }

  componentDidMount() {
    this.getOrder(this.props.match.params.id)
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
          <h4 className="offset-4 order-heading">Order #{order.order_no} - {order.status}</h4>

          <form onSubmit={this.acceptOrder}>
            <TextInput name='fname' label='First Name' defVal={order.fname} disabled />
            <TextInput name='lname' label='Last Name' defVal={order.lname} disabled />
            <TextInput name='price' type='number' label='Price' defVal={order.price} disabled />
            <TextInput name='orderDate' type='date' label='Order Date' defVal={order.date} disabled  />
            {!isDisabled && 
            <div className='col-sm-9 offset-md-3'>
              <button type='submit' className='btn btn-purple btn-loading'>Submit</button>
            </div>
            }
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
