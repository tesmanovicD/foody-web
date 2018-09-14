import React from 'react'
import ReactDOM from 'react-dom'
import './styles/css/index.css'
import App from './App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import store from './modules/store'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
<Provider store={store}>
        <Router>
            <Route path='/' component={App} />
        </Router>
</Provider>, document.getElementById('root'))
registerServiceWorker()
