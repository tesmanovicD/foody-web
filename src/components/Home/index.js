import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import actions from '../../modules/actions'
import Navigation from '../Navigation';
import Customers from '../Customers'
import CustomerEdit from '../Customers/CustomerEdit'
import Employee from '../Employee';

class Home extends Component {

  logoutUser = () => {
    this.props.dispatch(actions.users.logoutUser())
    this.props.history.push('/login')
  }

  render() {
    
    return (
      <div>
        <div className='header'>
          <div className='header-title'>
            <h5>Foody Cart</h5>
          </div>

          <div className='header-account'>
            <span>userIcon</span>
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
            </Switch>
          </div>
        </div>
        <button onClick={ this.logoutUser }>Logout</button>
      </div>
    )
  }
}

export default connect()(Home)
