import { Box, IconButton, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { getadminorders, updateadminorder, updatestatus } from '../../../../../api/order';
import Navbar from '../../../../../components/Navbar/Navbar';
import './style.scss'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [statusUpdate, setstatusUpdate] = useState(false);



    useEffect(() => {
        getadminorders().then((res) => {
            setOrders(res.data);
        })

    }, [statusUpdate])

    const handleAccept = (id) => {
        updatestatus({ orderId: id, status: "Accepted" }).then((res) => {
            setstatusUpdate(!statusUpdate);
        })
    }

    const handleReject = (id) => {
        updatestatus({ orderId: id, status: "Cancelled" }).then((res) => {
            setstatusUpdate(!statusUpdate);
        })
    }
    return (
        <>
            <Navbar />
            <Box className="orders-container">
                <Typography variant="h5" style={{ margin: "2% 0" }} >
                    Orders
                </Typography>
                <table style={{ width: "50%" }}>

                    <thead>

                        <tr style={{ backgroundColor: "#2196f3" }}>
                            <th>
                                S.No
                            </th>
                            <th>
                                OrderId
                            </th>
                            <th>
                                Item Name
                            </th>
                            <th>
                                Quantity
                            </th>
                            <th>
                                Item Price
                            </th>
                            <th>
                                Total
                            </th>
                            <th>
                                Change Status
                            </th>
                            <th>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((val, index) => {
                                return <tr key={val._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {val._id}
                                    </td>
                                    <td>
                                        {val.productId.title}
                                    </td>
                                    <td>
                                        {val.quantity}
                                    </td>
                                    <td>
                                        {val.productId.price}
                                    </td>
                                    <td>
                                        {val.quantity * val.productId.price}
                                    </td>

                                    <td>
                                        <IconButton onClick={() => { handleAccept(val._id) }} >
                                            <CheckCircleRoundedIcon style={{ color: "green" }} />
                                        </IconButton>
                                        <IconButton onClick={() => { handleReject(val._id) }}>
                                            <CloseRoundedIcon style={{ color: "red" }} />
                                        </IconButton>
                                    </td>
                                    <td>
                                        {val.status}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table></Box>
        </>)
}

export default AdminOrders