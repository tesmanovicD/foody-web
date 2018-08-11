import React from 'react'

const Worker = (props) => (
        <tr className='table-props'>
            <td>{props.employee.fname}  {props.employee.lname}</td>
            <td>{props.employee.username}</td>
            <td>
                <span onClick={() => props.deleteEmployee(props.employee.id)}>Delete</span>
                <span onClick={() => props.editEmployee(props.employee.id)}>Edit</span>
            </td>
        </tr>
)

export default Worker