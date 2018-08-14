import React from 'react'

const Order = (props) => (
        <tr className='table-props'>
            {/* <td>{props.order.fname}  {props.order.lname}</td>
            <td>{props.order.username}</td> */}
            <td>{props.order.quantity}</td>
            <td>{props.order.price}</td>
            <td>{props.order.date}</td>
            <td>{props.order.pickup_date}</td>
            <td>
                <span onClick={() => props.deleteEmployee(props.employee.id)}>Delete</span>
                <span onClick={() => props.editEmployee(props.employee.id)}>Edit</span>
            </td>
        </tr>
)

export default Order