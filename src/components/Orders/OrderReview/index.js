import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import toastr from 'toastr'

import actions from '../../../modules/actions'
import TextInput from '../../../containers/TextInput'

class OrderReview extends Component {

  state = {
    order: null,
    isDisabled: true,
    orderItems: [],
    showOrderItems: false
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
      this.getItemsFromOrder(id)
    })
    .catch(err => {
      toastr.error(err.data)
      this.props.history.push('/orders')
    })
  }

  getItemsFromOrder = (id) => {
    actions.orders.getItemsForOrder(id)
    .then(orderItems => {
      this.setState({ orderItems })
    })
    .catch(err => toastr.error(err.data))
  }

  acceptOrder = (e) => {
    e.preventDefault()
    const { order } = this.state
    //Get current date and add 20min on it
    const pickupDate = moment().add(20,'m').format('YYYY-MM-DD hh:mm:ss')

    this.props.dispatch(actions.orders.acceptOrder(order.id, pickupDate, order.id_customer, order.order_no))
    .then(() => {
      this.getOrder(this.props.match.params.id)
    })
    .catch(err => toastr.error(err.data))
  }

  cancelOrder = () => {
    const { order } = this.state

    this.props.dispatch(actions.orders.cancelOrder(order.id, order.id_customer, order.order_no))
    .then(() => this.getOrder(this.props.match.params.id))
    .catch(err => toastr.error(err.data))
  }

  handleChange = (e) => {
    this.setState({
      order: {
        ...this.state.order,
        end_date: e.target.value
      }
    })
  }

  showOrderItems = () => this.setState({ showOrderItems: !this.state.showOrderItems })

  componentDidMount() {
    this.getOrder(this.props.match.params.id)
  }

  render() {
    const { order, isDisabled, showOrderItems } = this.state
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
            <div className="order-control col-5 offset-3">
              <button type='button' className='btn btn-purple btn-loading' onClick={this.showOrderItems}>
                {!showOrderItems ? "Show ordered items" : "Hide order items"}
              </button>
              
              {!isDisabled && <button type='button' className='btn btn-purple btn-loading' onClick={this.cancelOrder}>Cancel</button>}
              {!isDisabled && <button type='submit' className='btn btn-purple btn-loading'>Submit</button>}
            </div>

            {showOrderItems &&
            <table className="table table-bordered table-striped col-sm-7 offset-sm-2">
              <thead>
                <tr>
                  <th>#</th>
                  <th>item</th>
                  <th>unit price</th>
                  <th>quantity</th>
                  <th>total price</th>
                </tr>
              </thead>
              <tbody>
              {this.state.orderItems.map((orderItem, key) => (
                    <tr key={orderItem.id}>
                      <td>{key}</td>
                      <td>{orderItem.item}</td>
                      <td>$ {orderItem.price.toFixed(2)}</td>
                      <td>{orderItem.quantity}</td>   
                      <td>$ {orderItem.total.toFixed(2)}</td>   
                    </tr>
              ))
              }
              </tbody>
              </table>
            }
          </form>
        </div>
      </div>
      :
      <div>There is no orders</div>
      }
      </section>
    )
  }
}

export default connect()(OrderReview)
