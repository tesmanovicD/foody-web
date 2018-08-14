import React from 'react'

const Item = (props) => (
        <tr className='table-props'>
            <td>{props.item.name}</td>
            <td>{props.item.description}</td>
            <td>{props.item.category}</td>
            <td>{props.item.price}</td>
            <td>
                <span onClick={() => props.deleteItem(props.item.id)}>Delete</span>
                <span onClick={() => props.editItem(props.item.id)}>Edit</span>
            </td>
        </tr>
)

export default Item