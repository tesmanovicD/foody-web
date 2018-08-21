import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import actions from '../../modules/actions'
import Navigation from '../Navigation';
import Customers from '../Customers'
import CustomerEdit from '../Customers/CustomerEdit'
import Employee from '../Employee';
import Orders from '../Orders';
import Coupons from '../Coupons';
import EmployeeEdit from '../Employee/EmployeeEdit';
import EmployeeAdd from '../Employee/EmployeeAdd';
import Categories from '../FoodSection/Categories';
import CategoryAdd from '../FoodSection/Categories/CategoryAdd';
import CategoryEdit from '../FoodSection/Categories/CategoryEdit';
import Items from '../FoodSection/Items';
import ItemAdd from '../FoodSection/Items/ItemAdd';
import ItemEdit from '../FoodSection/Items/ItemEdit';
import CouponAdd from '../Coupons/Coupon/CouponAdd';
import CouponEdit from '../Coupons/Coupon/CouponEdit';
import { FaUserCircle } from 'react-icons/fa';
import Icons from '../../containers/Icons';

class Home extends Component {

  logoutUser = () => {
    this.props.dispatch(actions.users.logoutUser())
    this.props.history.push('/login')
  }

  render() {
    
    return (
      <div>
        <div className='header'>
          <h5 className='header-title'>Foody Cart</h5>

          <div className='header-account'>
            <span><Icons size={35} color="white"><FaUserCircle /></Icons></span>
          </div>
        </div>

        <div className='main'>
          <div className='left-sidebar'>
            <Navigation />
          </div>

          <div className='main-content'>
            <Switch>
              <Route exact path='/customers' component={Customers} />
              <Route path='/customers/edit/:id' component={CustomerEdit} />
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
              <Route exact path='/coupons' component={Coupons} />
              <Route path='/coupons/add' component={CouponAdd} />
              <Route path='/coupons/edit/:id' component={CouponEdit} />
            </Switch>
          </div>
        </div>
        <button onClick={ this.logoutUser }>Logout</button>
      </div>
    )
  }
}

export default connect()(Home)
