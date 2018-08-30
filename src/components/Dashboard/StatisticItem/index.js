import React from 'react'

const StatisticItem = (props) => {
	const value = props.value ? props.value : 0
	return (
		<div className='col-md-6 col-lg-4' style={{marginBottom: '20px'}}>
				<div className="panel">
					<p className="statistic">
						{props.currency ?
							`$ ${value.toFixed(2)}`
								: 
								value
						}
					</p>
					<p className="statistic-name">
						{props.name}
					</p>
				</div>
		</div>
	)
}
export default StatisticItem