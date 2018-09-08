import React, { Component } from 'react'
import { connect } from 'react-redux'

import StatisticItem from './StatisticItem';
import actions from '../../modules/actions';

class Dashboard extends Component {

	getTotalStatistic = () => {
		this.props.dispatch(actions.statistic.getTotalStatistic())
	}

	getTodayStatistic = () => {
		this.props.dispatch(actions.statistic.getTodayStatistic())
	}

	componentDidMount() {
		this.getTotalStatistic()
		this.getTodayStatistic()
	}

  render() {
    return (
      <div className="card">
				<div className="card-header">
					<h6 className="card-title">Dashboard</h6>
				</div>
				<div className="card-body row">
					<StatisticItem value={this.props.todayStatistic.orders} name="Orders Today" />
					<StatisticItem value={this.props.todayStatistic.sales} name="Sales Today" currency />
					<StatisticItem value={this.props.todayStatistic.customers} name="Customers Today" />
					
					<StatisticItem value={this.props.totalStatistic.orders} name="Orders Total" />
					<StatisticItem value={this.props.totalStatistic.sales} name="Sales Total" currency />
					<StatisticItem value={this.props.totalStatistic.customers} name="Customers Total" />
				</div>
    	</div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		totalStatistic: state.statistic.totalStatistic,
		todayStatistic: state.statistic.todayStatistic
	}
}

export default connect(mapStateToProps)(Dashboard)
