import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import routes from './routes'

class App extends Component {

  componentWillMount() {
    const { loggedIn } = this.props.user
    
    if (!loggedIn) {
      this.props.history.push('/login')
    }
      
  }

  render() {
    return (
        <Router>
          { routes }
        </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
