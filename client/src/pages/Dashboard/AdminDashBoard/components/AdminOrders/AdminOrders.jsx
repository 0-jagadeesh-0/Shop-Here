import { Box } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getadminorders } from '../../../../../api/order';

function AdminOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        getadminorders().then((res) => {
            setOrders(res.data);
        })

    }, [])
    return (
        <div>AdminOrders
            <table>
                <thead>
                    <tr>
                        <td>
                            OrderId
                        </td>
                        <td>
                            Item Name
                        </td>
                        <td>
                            Item Price
                        </td>
                        <td>
                            Status
                        </td>
                    </tr>
                </thead>
                <tbody>


                    {
                        orders.map((val) => {
                            return <tr key={val._id}>
                                <td>
                                    {val._id}
                                </td>
                                <td>
                                    {val.productId.title}
                                </td>
                                <td>
                                    {val.productId.price}
                                </td>
                                <td>
                                    {val.status}
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table></div>
    )
}

export default AdminOrders