import React from 'react'
import moment from 'moment'

import Icons from '../../../containers/Icons'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

const Coupon = (props) => (
        <tr className='table-props'>
            <td>{props.coupon.code}</td>
            <td>{props.coupon.type}</td>
            <td>{props.coupon.discount}</td>
            <td>{props.coupon.usage_limit}</td>
            <td>{props.coupon.used_coupons}</td>
            <td>{moment.unix(props.coupon.end_date).format('DD/MM/YYYY')}</td>
            <td>{props.coupon.status}</td>        
            <td>
                <span onClick={() => props.editCoupon(props.coupon.id)}>
                    <Icons title="Edit">
                        <FaEdit />
                    </Icons>
                </span>
                <span onClick={() => props.deleteCoupon(props.coupon.id)}>
                    <Icons title="Delete">
                        <FaTrashAlt />
                    </Icons>
                </span>
            </td>
        </tr>
)

export default Coupon