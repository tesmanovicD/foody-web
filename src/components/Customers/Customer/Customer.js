import React from 'react'

const Customer = (props) => (
        <tr className='table-props'>
            <td>{props.customer.fname}  {props.customer.lname}</td>
            <td>{props.customer.email}</td>
            <td>{props.customer.phone || "- / -"}</td>
            <td>
                <span onClick={() => props.deleteCustomer(props.customer.id)}>Delete</span>
                <span onClick={() => props.editCustomer(props.customer.id)}>Edit</span>
            </td>
        </tr>
)

export default Customer