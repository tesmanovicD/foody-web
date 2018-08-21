import React from 'react'

import Icons from '../../../containers/Icons'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'


const Worker = (props) => (
        <tr className='table-props'>
            <td>{props.employee.fname}  {props.employee.lname}</td>
            <td>{props.employee.username}</td>
            <td>
                <span onClick={() => props.editEmployee(props.employee.id)}>
                    <Icons title="Edit">
                        <FaEdit />
                    </Icons>
                </span>
                <span onClick={() => props.deleteEmployee(props.employee.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Worker