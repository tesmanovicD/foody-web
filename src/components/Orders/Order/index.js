import React from 'react'
import moment from 'moment'

import Icons from '../../../containers/Icons'
import { FaTrashAlt, FaExclamationCircle, FaEye } from 'react-icons/fa'



const generateOrderStatus = (status, id, reviewOrder) => {
    if (status === 'Pending') {
        return <td onClick={() => reviewOrder(id, 'pending')}>
                    <span style={{marginRight: '5px'}}>{status}</span>
                    <Icons title='Review pending order' size={14}><FaExclamationCircle/></Icons>
                </td>
    } else if (status === 'Canceled') {
        return <td onClick={() => reviewOrder(id, 'completed')}>
                    <span style={{marginRight: '5px'}}>{status}</span>
                    <Icons title='Review order' size={14}><FaEye/></Icons>
                </td>
    }
    
    return <td onClick={() => reviewOrder(id, 'completed')}>
                <span style={{marginRight: '5px'}}>{status}</span>
                <Icons title='Review order' size={14}><FaEye/></Icons>
            </td>
}

const Order = (props) => (
        <tr className='table-props'>
            {props.order.fname && props.order.lname ?
            <td>{props.order.fname}  {props.order.lname}</td>
            :
            <td> - / -</td>
            }
            <td>$ {props.order.price.toFixed(2)}</td>
            <td>{moment.unix(props.order.date).format('DD/MM/YYYY HH:MM')}</td>
            {props.order.pickup_date !== 0 ?
            <td>{moment.unix(props.order.pickup_date).format('DD/MM/YYYY HH:MM')}</td>
            :
            <td>Not generated</td>
            }
            {generateOrderStatus(props.order.status, props.order.id, props.reviewOrder)}
            <td>
                <span onClick={() => props.deleteEmployee(props.employee.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Order