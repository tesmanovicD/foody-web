import React from 'react'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Auxillary'

const menuItems = [
    {url:'/dashboard', name:'Dashboard'},
    {url:'/employee', name:'Employee'},
    {url:'/customers', name:'Customers'},
    {url:'/orders', name:'Orders'},
    {url:'/food', name:'Food section', dropDown: [{url: '/food/categories', name: 'Dish Categories'}, {url: '/food/items', name: 'Dish Items'},]},
    {url:'/coupons', name:'Coupons'},
    {url:'/settings', name:'Settings'}
]

const Navigation = () => (
    <nav>
        {menuItems.map((i, key) => (
            !i.dropDown ?
            <Link to={i.url} key={key} className='nav-item'>{i.name}</Link>
            :
            <Aux key={key}>
                <Link to={i.url} key={key} className='nav-item'>{i.name}</Link>
                <nav className='nav-dropdown'>
                {i.dropDown.map((d, key) => (
                    <Link to={d.url} key={key} className='nav-dropdown-item'>{d.name}</Link>
                ))}
                </nav>
            </Aux>     
        ))
        }
    </nav>
)

export default Navigation