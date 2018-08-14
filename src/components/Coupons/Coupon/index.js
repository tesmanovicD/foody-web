import React from 'react'

const Coupon = (props) => (
        <tr className='table-props'>
            <td>{props.coupon.code}</td>
            <td>{props.coupon.type}</td>
            <td>{props.coupon.discount}</td>
            <td>{props.coupon.usage_limit}</td>
            <td>{props.coupon.used_coupons}</td>
            <td>{props.coupon.end_date}</td>
            <td>{props.coupon.enabled}</td>        
            <td>
                <span onClick={() => props.deleteCoupon(props.coupon.id)}>Delete</span>
                <span onClick={() => props.editCoupon(props.coupon.id)}>Edit</span>
            </td>
        </tr>
)

export default Coupon