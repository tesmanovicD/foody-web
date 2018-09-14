import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

import actions from '../../modules/actions'
import Navigation from '../Navigation'
import Customers from '../Customers'
import CustomerAdd from '../Customers/CustomerAdd'
import CustomerEdit from '../Customers/CustomerEdit'
import Employee from '../Employee'
import Orders from '../Orders'
import Coupons from '../Coupons'
import EmployeeEdit from '../Employee/EmployeeEdit'
import EmployeeAdd from '../Employee/EmployeeAdd'
import Categories from '../FoodSection/Categories'
import CategoryAdd from '../FoodSection/Categories/CategoryAdd'
import CategoryEdit from '../FoodSection/Categories/CategoryEdit'
import Items from '../FoodSection/Items'
import ItemAdd from '../FoodSection/Items/ItemAdd'
import ItemEdit from '../FoodSection/Items/ItemEdit'
import CouponAdd from '../Coupons/Coupon/CouponAdd'
import CouponEdit from '../Coupons/Coupon/CouponEdit'
import Icons from '../../containers/Icons'
import Dashboard from '../Dashboard'
import OrderReview from '../Orders/OrderReview'

class Home extends Component {

  state = {
    userMenuToggled: false
  }

  logoutUser = () => {
    this.props.dispatch(actions.users.logoutUser())
    this.props.history.push('/login')
  }

  toggleHiddenItem = (e, item) => {
    e.preventDefault()
    let target = document.getElementById(`${item}-nav`)
    target[1].style.backgroundColor = "yellow"
  }

  initializeOneSignal = () => {
    var OneSignal = window.OneSignal || []
    OneSignal.push(function() {
      OneSignal.init({
        appId: "74723254-f9b6-4f24-bde3-5835a592f71e",
      })
      OneSignal.sendTags({
        rule: 'Chef',
      })
    })
  }

  toggleUserMenu = () => this.setState({ userMenuToggled: !this.state.userMenuToggled })

  componentWillMount() {
    this.initializeOneSignal()
  }

  render() {
    
    return (
      <div>
        <div className='header'>
          <h5 className='header-title'>Foody Cart</h5>

          <div className='header-account'>
            <span onClick={this.toggleUserMenu}><Icons size={35} color="white"><FaUserCircle /></Icons></span>
            {this.state.userMenuToggled &&
              <ul className="dropdown-user-menu">
                  <li><span>My account</span></li>
                  <li><span>Change password</span></li>
                  <li role="separator" className="divider"></li>
                  <li><span onClick={ this.logoutUser }>Log out</span></li>
              </ul>
            }
          </div>
        </div>

        <div className='main'>
          <div className='left-sidebar'>
            <Navigation toggleHiddenItem={this.toggleHiddenItem} />
          </div>

          <div className='main-content'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/customers' component={Customers} />
              <Route path='/customers/edit/:id' component={CustomerEdit} />
              <Route path='/customers/add' component={CustomerAdd} />
              <Route exact path='/employee' component={Employee} />
              <Route path='/employee/edit/:id' component={EmployeeEdit} />
              <Route path='/employee/add' component={EmployeeAdd} />
              <Route exact path='/food/categories' component={Categories} />
              <Route path='/food/categories/add' component={CategoryAdd} />
              <Route path='/food/categories/edit/:id' component={CategoryEdit} /> 
              <Route exact path='/food/items' component={Items} />
              <Route path='/food/items/add' component={ItemAdd} />
              <Route path='/food/items/edit/:id' component={ItemEdit} />
              <Route exact path='/orders' component={Orders} />
              <Route path='/orders/review/:id' component={OrderReview} />
              <Route exact path='/coupons' component={Coupons} />
              <Route path='/coupons/add' component={CouponAdd} />
              <Route path='/coupons/edit/:id' component={CouponEdit} />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Home)
