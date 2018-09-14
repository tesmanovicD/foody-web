import React from 'react'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import Icons from '../../../../containers/Icons'

const Category = (props) => (
        <tr className='table-props'>
            <td>{props.category.name}</td>
            <td>{props.category.description}</td>  
            <td>
                <span onClick={() => props.editCategory(props.category.id)}>
                    <Icons title="Edit">
                        <FaEdit />
                    </Icons>
                </span>
                <span onClick={() => props.deleteCategory(props.category.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>                
            </td>
        </tr>
)

export default Category