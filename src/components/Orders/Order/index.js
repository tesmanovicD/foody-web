import React from 'react'
import moment from 'moment'
import { FaTrashAlt, FaExclamationCircle, FaEye } from 'react-icons/fa'

import Icons from '../../../containers/Icons'


const generateOrderStatus = (status, id, reviewOrder) => {
    if (status === 'Pending') {
        return <td onClick={() => reviewOrder(id)}>
                    <span style={{marginRight: '5px'}}>{status}</span>
                    <Icons title='Review pending order' size={14}><FaExclamationCircle/></Icons>
                </td>
    } 
    
    return <td onClick={() => reviewOrder(id)}>
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
            <td>{moment.unix(props.order.date).format('DD/MM/YYYY HH:mm')}</td>
            {props.order.pickup_date !== 0 && props.order.pickup_date != null ?
            <td>{moment.unix(props.order.pickup_date).format('DD/MM/YYYY HH:mm')}</td>
            :
            <td>Not generated</td>
            }
            {generateOrderStatus(props.order.status, props.order.id, props.reviewOrder)}
            <td>
                <span onClick={() => props.deleteOrder(props.order.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Order