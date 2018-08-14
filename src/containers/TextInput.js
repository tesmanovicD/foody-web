import React from 'react'

const TextInput = (props) => (
    <div className='form-group col-6 offset-2'>
        <label htmlFor={props.id || props.name} className='form-label col-2'>{props.label}</label>
        <input type={props.type? props.type : 'text'} className={props.class ? `${props.class} col-10` : 'form-control col-10'} id={props.id || props.name} name={props.name} defaultValue={props.defVal || ''} onChange={(e) => props.action(e)} />
    </div>
)

export default TextInput