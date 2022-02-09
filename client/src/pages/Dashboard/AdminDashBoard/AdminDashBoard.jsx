import './style.scss';
import { Box, Typography } from '@mui/material';
import Navbar from '../../../components/Navbar/Navbar';
import { Navigate, useNavigate } from 'react-router-dom';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ManageAccountsSharpIcon from '@mui/icons-material/ManageAccountsSharp';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import ExitToAppSharpIcon from '@mui/icons-material/ExitToAppSharp';
import DensitySmallSharpIcon from '@mui/icons-material/DensitySmallSharp';

function AdminDashBoard() {
    const navigate = useNavigate();
    return <>{localStorage.getItem("isAdmin") ? <Box className='admin-dashboard'>
        <Navbar />
        <Box className='dashboard'>
            <Box className='sidebar'>
                <Box onClick={() => navigate("/dashboard")} className='sidebar-menu'>
                    <GridViewSharpIcon color='primary' className='menu-icon' />
                    <Typography>
                        DASHBOARD
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/add-item")} className='sidebar-menu'>
                    <AddCircleSharpIcon color="primary" className='menu-icon' />
                    <Typography>
                        ADD PRODUCT
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/myproducts")} className='sidebar-menu'>
                    <DensitySmallSharpIcon color="primary" className='menu-icon' />
                    <Typography>
                        MY PRODUCTS
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/dashboard")} className='sidebar-menu'>
                    <AddShoppingCartSharpIcon color='primary' className='menu-icon' />
                    <Typography>
                        ORDERS
                    </Typography>
                </Box>
                <Box onClick={() => navigate("/dashboard")} className='sidebar-menu'>
                    <ManageAccountsSharpIcon color='primary' className='menu-icon' />
                    <Typography>
                        ACCOUNT SETTINGS
                    </Typography>
                </Box>
                <Box onClick={() => { localStorage.clear(); navigate("/") }} className='sidebar-menu'>
                    <ExitToAppSharpIcon color='primary' className='menu-icon' />
                    <Typography>
                        LOGOUT
                    </Typography>
                </Box>


            </Box>
            <Box className='stats-container'>

            </Box>
        </Box>
    </Box> : <Navigate to="/" />}</>;
}

export default AdminDashBoard;

