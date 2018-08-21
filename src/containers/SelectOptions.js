import React from 'react'

const SelectOptions = (props) => (
    <div className='form-group col-6 offset-2'>
        <label htmlFor={props.id || props.name} className='form-label col-3'>{props.label}</label>
        <select name={props.name} id={props.id || props.name.toLowerCase()} value={props.defVal || 'choose'}
                className={props.class ? `${props.class} col-9` : 'form-control col-9'} onChange={props.action} >
            <option value='choose' disabled>- choose -</option>
            {props.opt.map((o, key) => <option key={key} value={o.value || o.id || o.name}>{o.name}</option>)}
        </select>
    </div>
)

export default SelectOptions