import React from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'

import Icons from '../../../containers/Icons'


const Customer = (props) => (
        <tr className='table-props'>
            <td>{props.customer.fname}  {props.customer.lname}</td>
            <td>{props.customer.email}</td>
            <td>{props.customer.phone || "- / -"}</td>
            <td>
                <span onClick={() => props.editCustomer(props.customer.id)}>
                    <Icons title="Delete">
                        <FaEdit />
                    </Icons>
                </span>
                <span onClick={() => props.deleteCustomer(props.customer.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt/>
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Customer