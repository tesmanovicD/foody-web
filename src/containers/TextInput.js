import React from 'react'

const TextInput = (props) => (
    <div className='form-group col-6 offset-2'>
        <label htmlFor={props.id || props.name} className='form-label col-3'>{props.label}</label>
        <input type={props.type? props.type : 'text'} className={props.class ? `${props.class} col-9` : 'form-control col-9'} id={props.id || props.name} name={props.name} defaultValue={props.defVal !== undefined ? props.defVal : ''} onChange={(e) => props.action(e)} />
    </div>
)

export default TextInput