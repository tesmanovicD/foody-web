import React from 'react'
import Icons from '../../../../containers/Icons';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Item = (props) => (
        <tr className='table-props'>
            <td>{props.item.name}</td>
            <td>{props.item.description}</td>
            <td>{props.item.category}</td>
            <td>{props.item.price}</td>
            <td>
                <span onClick={() => props.editItem(props.item.id)}>
                    <Icons title="Edit">
                        <FaEdit />
                    </Icons>
                </span>
                <span onClick={() => props.deleteItem(props.item.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Item