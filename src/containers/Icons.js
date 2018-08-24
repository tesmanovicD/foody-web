import React from 'react'
import { IconContext } from 'react-icons'

const Icons = (props) => (
    <IconContext.Provider value={{
        className: props.class? `${props.class} fa-icons` : "fa-icons",
        size:props.size? `${props.size}px` : "16px",  
        color: props.color? props.color : 'black'
    }}>
        <span title={props.title}>
            {props.children}
        </span>
    </IconContext.Provider>    
)

export default Icons
