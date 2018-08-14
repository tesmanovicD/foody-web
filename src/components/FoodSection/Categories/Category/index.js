import React from 'react'

const Category = (props) => (
        <tr className='table-props'>
            <td>{props.category.name}</td>
            <td>{props.category.description}</td>  
            <td>
                <span onClick={() => props.deleteCategory(props.category.id)}>Delete</span>
                <span onClick={() => props.editCategory(props.category.id)}>Edit</span>
            </td>
        </tr>
)

export default Category