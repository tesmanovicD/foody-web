import React from 'react'
import { Link } from 'react-router-dom'

const menuItems = [
    {url:'/dashboard', name:'Dashboard'},
    {url:'/employee', name:'Employee'},
    {url:'/customers', name:'Customers'},
    {url:'/orders', name:'Orders'},
    {url:'/food', name:'Food section'},
    {url:'/coupons', name:'Coupons'},
    {url:'/settings', name:'Settings'}
]

const Navigation = () => (
    <nav>
        {menuItems.map((i, key) => (
            <Link to={i.url} key={key} className='nav-item'>{i.name}</Link>
        ))
        }
    </nav>
)

export default Navigation